/* -----------------
* deviceDriverDisk.ts
*
* Device Driver Disk
* --------------------*/
var TSOS;
(function (TSOS) {
    class DeviceDriverDisk extends TSOS.DeviceDriver {
        constructor() {
            // Override the base method pointers.
            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnDiskDriverEntry;
        }
        krnDiskDriverEntry() {
            // Initialization routine for this, the Disk Device Driver.
            this.status = "loaded";
            // More?
        }
        formatDisk() {
            _Kernel.krnTrace("Beginning disk format.");
            var block = this.createNewBlock();
            for (var i = 0; i < _Disk.numTracks; i++) {
                for (var j = 0; j < _Disk.numSectors; j++) {
                    for (var k = 0; k < _Disk.numBlocks; k++) {
                        //Master Boot Record
                        if ((i == 0) && (j == 0) && (k == 0)) {
                            block[0] = "1";
                            sessionStorage.setItem(i + "," + j + "," + k, block.join(" "));
                            block[0] = "0";
                        }
                        else {
                            sessionStorage.setItem(i + "," + j + "," + k, block.join(" "));
                        }
                    }
                }
            }
            _Kernel.krnTrace("Disk formatted.");
            TSOS.Control.updateDiskDisplay();
        }
        createNewBlock() {
            //Each block is an array of size 64
            let block = new Array(64);
            for (var i = 0; i < 4; i++) {
                block[i] = "0";
            }
            for (var j = 0; j < block.length; j++) {
                block[j] = "-";
            }
            return block;
        }
        createFile(fileName) {
            //First file entry will be directory block 001
            //TODO: check that file doesn't exist first - return true or false
            var fileTSB = this.getFileTSB(fileName);
            if (fileTSB != null) {
                //alert("File " + fileName + " already exists.");
                return false;
            }
            else {
                var directoryEntry = this.nextDirectoryEntry();
                var dataEntry = this.nextDataEntry();
                var directoryEntryData = this.createNewBlock();
                var dataEntryData = this.createNewBlock();
                //Set the used bit to 1 for both the directory entry and data entry
                directoryEntryData[0] = "1";
                dataEntryData[0] = "1";
                //Split on commas to put the T,S,B of data entry in the directory
                var dataEntrySplit = dataEntry.split(",");
                directoryEntryData[1] = dataEntrySplit[0];
                directoryEntryData[2] = dataEntrySplit[1];
                directoryEntryData[3] = dataEntrySplit[2];
                for (var i = 0; i < fileName.length; i++) {
                    directoryEntryData[i + 4] = this.decimalToHex(fileName.charCodeAt(i));
                }
                sessionStorage.setItem(directoryEntry, directoryEntryData.join(" "));
                sessionStorage.setItem(dataEntry, dataEntryData.join(" "));
                return true;
            }
        }
        createSwapFile(pid, fileData) {
            var fileName = "@swap" + pid;
            if (this.createFile(fileName)) {
                if (this.writeToFile(fileName, fileData, true)) {
                    alert("Swap file " + fileName + " has been created.");
                }
                else {
                    alert("Issue writing to file" + fileName);
                    return false;
                }
            }
            else {
                alert("File " + fileName + " cannot be created.");
                return false;
            }
            return true;
        }
        //Finds the next directory entry to store the filename that is being created
        nextDirectoryEntry() {
            for (var i = 0; i < _Disk.numSectors; i++) {
                for (var j = 0; j < _Disk.numTracks; j++) {
                    var data = sessionStorage.getItem("0," + i + "," + j).split(" ");
                    if (data[0] === "0") {
                        return "0," + i + "," + j;
                    }
                }
            }
            return null;
        }
        nextDataEntry() {
            //Start at track 1 for data section of file system
            for (var i = 1; i < _Disk.numTracks; i++) {
                for (var j = 0; j < _Disk.numSectors; j++) {
                    for (var k = 0; k < _Disk.numBlocks; k++) {
                        var data = sessionStorage.getItem(i + "," + j + "," + k);
                        if (data[0] === "0") {
                            return i + "," + j + "," + k;
                        }
                    }
                }
            }
            return null;
        }
        /*
        public readMultipleFiles(fileLoc: string, fileData: string, hexFile: boolean) {
            var fileName = this.getFileDataTSB(fileLoc);
            this.readFile(fileName, fileData, hexFile);
        }
        */
        readFile(fileName, fileLoc, fileData, hexFile) {
            if (hexFile == undefined) {
                hexFile = false;
            }
            if (fileData == undefined) {
                fileData = "";
            }
            var fileDataTSB;
            if (fileName == undefined && fileLoc != undefined) {
                fileDataTSB = fileLoc;
            }
            else {
                fileDataTSB = this.getFileDataTSB(fileName);
            }
            if (fileDataTSB != null) {
                var fileDataArr = sessionStorage.getItem(fileDataTSB);
                let splitFileDataArr = fileDataArr.split(" ");
                for (let i = 4; i < splitFileDataArr.length; i++) {
                    if (hexFile) {
                        fileData += splitFileDataArr[i];
                    }
                    else {
                        fileData += String.fromCharCode(this.hexToDecimal(splitFileDataArr[i]));
                    }
                }
                if (splitFileDataArr[1] != "-") {
                    var nextLoc = splitFileDataArr[1] + "," + splitFileDataArr[2] + "," + splitFileDataArr[3];
                    return this.readFile(undefined, nextLoc, fileData, hexFile);
                }
                return fileData;
            }
            else {
                //alert("File " + fileName + " doesn't exist and cannot be read");
                return null;
            }
        }
        writeToFile(fileName, fileData, hexFile, nextDataTSB) {
            //FILE TSB REFERS TO IN DIRECTORY, FILE DATA TSB REFERS TO IN DATA SECTION
            //First need to find the t,s,b of the directory entry with the filename
            //Then need go into that t,s,b to get just the fileName to match it with the command
            //Then need to get the data t,s,b for where to write to
            //Finally write the data to that data t,s,b
            var fileDataTSB = this.getFileDataTSB(fileName);
            if (fileDataTSB != null) {
                //When writing to a file, check the length to see if it needs to be linked to another tsb
                //Writing to a file will replace any data that was previously in the file
                //alert(fileDataTSB);
                //alert(fileData);
                var dataBlock = this.createNewBlock();
                if (fileData.length <= 60) {
                    for (var i = 0; i < fileData.length; i++) {
                        if (hexFile) {
                            dataBlock[i + 4] = fileData.charAt(i);
                        }
                        else {
                            dataBlock[i + 4] = this.decimalToHex(fileData.charCodeAt(i));
                        }
                    }
                    dataBlock[0] = "1";
                    var newDataLoc;
                    if (nextDataTSB != undefined) {
                        newDataLoc = nextDataTSB;
                    }
                    else {
                        newDataLoc = fileDataTSB;
                    }
                    sessionStorage.setItem(newDataLoc, dataBlock.join(" "));
                }
                else {
                    var newDataBlock = this.createNewBlock();
                    for (var j = 0; j < 60; j++) {
                        if (hexFile) {
                            //Don't need to convert, already in hex
                            newDataBlock[j + 4] = fileData.charAt(j);
                        }
                        else {
                            newDataBlock[j + 4] = this.decimalToHex(fileData.charCodeAt(j));
                        }
                    }
                    newDataBlock[0] = "1";
                    var newDataLoc;
                    if (nextDataTSB != undefined) {
                        newDataLoc = nextDataTSB;
                    }
                    else {
                        newDataLoc = fileDataTSB;
                    }
                    sessionStorage.setItem(newDataLoc, newDataBlock.join(" "));
                    var nextDataTSB = this.nextDataEntry();
                    var nextSplit = nextDataTSB.split(",");
                    var tempStorage = sessionStorage.getItem(newDataLoc).split(" ");
                    //Update to point to new data tsb 
                    tempStorage[1] = nextSplit[0];
                    tempStorage[2] = nextSplit[1];
                    tempStorage[3] = nextSplit[2];
                    sessionStorage.setItem(newDataLoc, tempStorage.join(" "));
                    //Get the data still left if any and call write to file again
                    var dataStillLeft = fileData.substring(60, fileData.length);
                    return this.writeToFile(fileName, dataStillLeft, hexFile, nextDataTSB);
                }
                return true;
            }
            else {
                //alert("File " + fileName + " can't be written to.");
                return false;
            }
        }
        //Takes in the fileName and returns the t,s,b of where the data in that file is
        getFileDataTSB(fileName) {
            let tsbFile = this.getFileTSB(fileName);
            if (tsbFile != null) {
                let tsbFileData = sessionStorage.getItem(tsbFile).split(" ");
                return tsbFileData[1] + "," + tsbFileData[2] + "," + tsbFileData[3];
            }
            else {
                return null;
            }
        }
        //Takes in the fileName and returns the t,s,b of the file in the directory
        getFileTSB(fileName) {
            for (let i = 0; i < _Disk.numSectors; i++) {
                for (let j = 0; j < _Disk.numBlocks; j++) {
                    let data = sessionStorage.getItem("0," + i + "," + j).split(" ");
                    let usedBit = data[0];
                    let thisFileName = this.getFileName(data);
                    if (thisFileName == fileName) {
                        if (usedBit == "1") {
                            return "0," + i + "," + j;
                            break;
                        }
                        else if (usedBit == "0") {
                            return null;
                        }
                    }
                }
            }
            return null;
        }
        //Takes in the whole block of data containing the filename, and returns just the filename
        getFileName(fileNameData) {
            let fileName = "";
            for (let i = 4; i < fileNameData.length; i++) {
                if (fileNameData[i] === "-") {
                    return fileName;
                }
                else {
                    fileName += String.fromCharCode(this.hexToDecimal(fileNameData[i]));
                }
            }
            return fileName;
        }
        deleteFile(fileName) {
            //Need to delete both the filename entry in the directory, and the data entry 
            var dataTSBtoDelete = this.getFileDataTSB(fileName);
            if (this.deleteFileDirectory(fileName) && this.deleteFileData(dataTSBtoDelete)) {
                //alert("File deleted.");
                return true;
            }
            else {
                //alert("File couldn't be deleted.");
                return false;
            }
        }
        deleteFileDirectory(fileName) {
            var fileTSB = this.getFileTSB(fileName);
            if (fileTSB != null) {
                var dataToDelete = sessionStorage.getItem(fileTSB).split(" ");
                dataToDelete[0] = "0";
                dataToDelete[1] = "-";
                dataToDelete[2] = "-";
                dataToDelete[3] = "-";
                for (var i = 0; i < fileName.length; i++) {
                    dataToDelete[i + 4] = "-";
                }
                sessionStorage.setItem(fileTSB, dataToDelete.join(" "));
                return true;
            }
            else {
                return false;
            }
        }
        deleteFileData(dataTSBtoDelete) {
            if (dataTSBtoDelete != null) {
                var dataToDelete = sessionStorage.getItem(dataTSBtoDelete).split(" ");
                dataToDelete[0] = "0";
                if (dataToDelete[1] != "-") {
                    var nextDataTSB = dataToDelete[1] + "," + dataToDelete[2] + "," + dataToDelete[3];
                    dataToDelete[1] = "-";
                    dataToDelete[2] = "-";
                    dataToDelete[3] = "-";
                    for (var i = 4; i < 85; i++) {
                        dataToDelete[i] = "-";
                    }
                    sessionStorage.setItem(dataTSBtoDelete, dataToDelete.join(" "));
                    this.deleteFileData(nextDataTSB);
                }
                else {
                    for (var i = 4; i < 64; i++) {
                        dataToDelete[i] = "-";
                    }
                    sessionStorage.setItem(dataTSBtoDelete, dataToDelete.join(" "));
                    return true;
                }
            }
            else {
                return false;
            }
        }
        copyFile(fileName, newFileName) {
            //First need to create the new file
            //Then write to the new file the contents of the existing file
            //Check that the first file already exists and that the second doesn't
            var fileTSB = this.getFileTSB(fileName);
            var newFileTSB = this.getFileTSB(newFileName);
            if (fileTSB != null) {
                if (newFileTSB === null) {
                    this.createFile(newFileName);
                    this.writeToFile(newFileName, this.readFile(fileName, undefined, undefined, undefined));
                    return true;
                }
                else {
                    alert("File " + newFileName + " already exists so it can't be copied to.");
                    return false;
                }
            }
            else {
                alert("File " + fileName + " doesn't exist and can't be copied.");
                return false;
            }
        }
        renameFile(fileName, newFileName) {
            //First need to check that the first file name exists
            //Go to directory and write over the previous file name
            var fileTSB = this.getFileTSB(fileName);
            var oldFileDataTSB = this.getFileDataTSB(fileName);
            if (fileTSB != null) {
                //alert(fileTSB);
                var dataBlock = this.createNewBlock();
                for (var i = 0; i < newFileName.length; i++) {
                    dataBlock[i + 4] = this.decimalToHex(newFileName.charCodeAt(i));
                }
                dataBlock[0] = "1";
                var oldFileDataTSBSplit = oldFileDataTSB.split(",");
                dataBlock[1] = oldFileDataTSBSplit[0];
                dataBlock[2] = oldFileDataTSBSplit[1];
                dataBlock[3] = oldFileDataTSBSplit[2];
                sessionStorage.setItem(fileTSB, dataBlock.join(" "));
                return true;
            }
            else {
                //alert("File " + fileName + " doesn't exist and cannot be renamed.");
                return false;
            }
        }
        listFiles() {
            var fileList = [];
            for (var i = 0; i < _Disk.numSectors; i++) {
                for (var j = 0; j < _Disk.numBlocks; j++) {
                    var data = sessionStorage.getItem("0," + i + "," + j).split(" ");
                    //Ignore Master Boot Record
                    if (!((i == 0) && (j == 0))) {
                        if (data[0] == "1") { //used bit has to be 1
                            var fileName = this.getFileName(data);
                            fileList[fileList.length] = fileName;
                        }
                    }
                }
            }
            return fileList;
        }
        decimalToHex(decimalNum) {
            return decimalNum.toString(16);
        }
        hexToDecimal(hexString) {
            return parseInt(hexString, 16);
        }
    }
    TSOS.DeviceDriverDisk = DeviceDriverDisk;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverDisk.js.map