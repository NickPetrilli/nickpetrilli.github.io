/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module TSOS {
    export class Shell {
        // Properties
        public promptStr = ">";
        public commandList = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";

        constructor() {
        }

        public init() {
            var sc: ShellCommand;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // date
            sc = new ShellCommand(this.shellDate,
                                 "date",
                                 "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;

            // whereami
            sc = new ShellCommand(this.shellWhereAmI,
                                 "whereami",
                                 "- Displays your location.");
            this.commandList[this.commandList.length] = sc;

            //hello
            sc = new ShellCommand(this.shellHello,
                                 "hello",
                                 "- Displays a greeting.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;

            //status <string>
            sc = new ShellCommand(this.shellStatus,
                                 "status",
                                 "<string> - Sets the status message.");
            this.commandList[this.commandList.length] = sc;
            
            //bsod - blue screen of death
            sc = new ShellCommand(this.shellBsod,
                                 "bsod",
                                 "- Displays a blue screen of death.");
            this.commandList[this.commandList.length] = sc;

            //load
            sc = new ShellCommand(this.shellLoad,
                                 "load",
                                 "- Loads program from user program input text area.");
            this.commandList[this.commandList.length] = sc;

            //run <pid>
            sc = new ShellCommand(this.shellRun,
                                  "run",
                                  "<pid> - Runs the process with the given pid.");
            this.commandList[this.commandList.length] = sc;

            //clearmem
            sc = new ShellCommand(this.shellClearMem,
                                 "clearmem",
                                 "- Clears all memory partitions");
            this.commandList[this.commandList.length] = sc;

            //runall
            sc = new ShellCommand(this.shellRunAll,
                                  "runall",
                                  "- Runs all of the processes in memory");
            this.commandList[this.commandList.length] = sc;

            //ps
            sc = new ShellCommand(this.shellPs,
                                  "ps",
                                  "- Lists all the running proceses and their IDs");
            this.commandList[this.commandList.length] = sc;

            //kill <pid>
            sc = new ShellCommand(this.shellKill,
                                  "kill",
                                  "<pid> - Kills the process running with the given pid");
            this.commandList[this.commandList.length] = sc;

            //killall
            sc = new ShellCommand(this.shellKillAll,
                                  "killall",
                                  "- Kills all of the processes");
            this.commandList[this.commandList.length] = sc;

            //quantum <num>
            sc = new ShellCommand(this.shellQuantum,
                                "quantum",
                                "<num> - Sets the quantum for Round Robin scheduling");
            this.commandList[this.commandList.length] = sc;

            //format
            sc = new ShellCommand(this.shellFormat,
                                  "format",
                                  "- Initializes and formats the hard disk");
            this.commandList[this.commandList.length] = sc;

            //create <filename>
            sc = new ShellCommand(this.shellCreate,
                                 "create",
                                 "<filename> - Creates a file with name <filename>");
            this.commandList[this.commandList.length] = sc;

            //read <filename>
            sc = new ShellCommand(this.shellRead,
                                 "read",
                                  "<filename> - Reads and displays the contents of <filename>");
            this.commandList[this.commandList.length] = sc;

            //write <filename> "data"
            sc = new ShellCommand(this.shellWrite,
                                 "write",
                                 "<filename> 'data' - Writes the contents of 'data' to <filename>");
            this.commandList[this.commandList.length] = sc;

            //delete <filename>
            sc = new ShellCommand(this.shellDelete,
                                 "delete",
                                 "<filename> - Remove <filename> from disk storage");
            this.commandList[this.commandList.length] = sc;

            //copy <existing filename> <new filename>
            sc = new ShellCommand(this.shellCopy,
                                 "copy",
                                 "<existing filename> <new filename> - Copy the contents to <new filename>");
            this.commandList[this.commandList.length] = sc;

            //rename <current filename> <new filename>
            sc = new ShellCommand(this.shellRename,
                                 "rename",
                                 "<current filename> <new filename> - Rename <current filename> to <new filename>");
            this.commandList[this.commandList.length] = sc;

            //ls
            sc = new ShellCommand(this.shellLs,
                                 "ls",
                                 "- Displays the files currently stored on the disk");
            this.commandList[this.commandList.length] = sc;

            //getSchedule
            sc = new ShellCommand(this.shellGetSchedule,
                                 "getschedule",
                                 "- Displays the current CPU scheduling algorithm.");
            this.commandList[this.commandList.length] = sc;

            //setSchedule
            sc = new ShellCommand(this.shellSetSchedule,
                                 "setschedule",
                                 "<string> - Sets the CPU schedule. Options are RR (Round Robin) and FCFS (First Come First Serve).");
            this.commandList[this.commandList.length] = sc;

            // Display the initial prompt.
            this.putPrompt();
        }

        public putPrompt() {
            _StdOut.putText(this.promptStr);
        }

        public handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match. 
            // TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index: number = 0;
            var found: boolean = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);  // Note that args is always supplied, though it might be empty.
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) {     // Check for curses.
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {        // Check for apologies.
                    this.execute(this.shellApology);
                } else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // Note: args is an optional parameter, ergo the ? which allows TypeScript to understand that.
        public execute(fn, args?) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }

        public parseInput(buffer: string): UserCommand {
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript. See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }

        //
        // Shell Command Functions. Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        public shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            } else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }

        public shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }

        public shellApology() {
           if (_SarcasticMode) {
              _StdOut.putText("I think we can put our differences behind us.");
              _StdOut.advanceLine();
              _StdOut.putText("For science . . . You monster.");
              _SarcasticMode = false;
           } else {
              _StdOut.putText("For what?");
           }
        }

        // Although args is unused in some of these functions, it is always provided in the 
        // actual parameter list when this function is called, so I feel like we need it.

        public shellVer(args: string[]) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }

        public shellHelp(args: string[]) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }

        public shellDate(args: string[]) {
            _StdOut.putText("The current date and time is " + Date());
        }

        public shellWhereAmI(args: string[]) {
            _StdOut.putText("In the right place at the right time.");
        }

        public shellHello(args: string[]) {
            var date = new Date();
            var hours = date.getHours();

            //Checking for the time for different output messages
            if (hours < 12) {
                _StdOut.putText("Good morning, my favorite user.");
            }
            else if (hours >= 12 && hours < 17) {
                _StdOut.putText("Good afternoon, my favorite user.");
            }
            else if (hours >= 17 && hours <= 24){
                _StdOut.putText("Good evening, my favorite user.");
            }
        }

        public shellShutdown(args: string[]) {
             _StdOut.putText("Shutting down...");
             // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed. If possible. Not a high priority. (Damn OCD!)
        }

        public shellCls(args: string[]) {         
            _StdOut.clearScreen();     
            _StdOut.resetXY();
        }

        public shellMan(args: string[]) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    case "ver":
                        _StdOut.putText("Ver displays the name and version of the operating system.");
                        break;
                    case "date": 
                        _StdOut.putText("Date displays the current date and time.");
                        break;
                    case "whereami":
                        _StdOut.putText("Whereami displays your location.");
                        break;
                    case "hello":
                        _StdOut.putText("Hello displays a greeting.");
                        break;
                    case "shutdown":
                        _StdOut.putText("Shutdown calls the kernel shutdown routine, shutting downthe virtual OS but leaves the underlying host / hardware simulation running.");
                        break;
                    case "cls":
                        _StdOut.putText("Cls clears the screen and resets the cursor position.");
                        break;
                    case "man":
                        _StdOut.putText("Man takes a command argument and outputs what the command does.");
                        break;
                    case "trace":
                        _StdOut.putText("Trace followed by on or off turns the OS trace on or off.");
                        break;
                    case "rot13":
                        _StdOut.putText("Rot13 takes a string argument and does the rot13 obfuscation on the string");
                        break;
                    case "prompt":
                        _StdOut.putText("Prompt takes a string as an argument and sets the prompt to that string.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args: string[]) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        } else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args: string[]) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args: string[]) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }

        public shellStatus(args: string[]) {
            if (args.length > 0) {
                var statusLength = args.length;
                var status = "Status: ";
                // Valid for multiple word input
                for (let i = 0; i < statusLength; i++) {
                    status = status + args[i] + " ";
                }
                document.getElementById('divStatus').innerHTML = status;
                _StdOut.putText("Status updated.");
            }
            else {
                _StdOut.putText("Usage: status <string>  Please supply a string.");
            }
        }

        public shellBsod(args: string[]) {
           CanvasTextFunctions.bsod();
        }

        public shellLoad(args: string[]) {
            //Only hex digits and spaces are allowed
            
            var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', ' '];
            var isValid = true;

            _UserProgramInput = (<HTMLInputElement>document.getElementById('taProgramInput')).value;
            
            if (_UserProgramInput.length == 0) {
                isValid = false;
            }
            for (var i = 0; i < _UserProgramInput.length; i++) {
                var char = _UserProgramInput[i];
                if (hexDigits.indexOf(char) === -1) {
                    isValid = false;
                    break;
                }
            }

            if (!isValid) {
                _StdOut.putText("Invalid user program.");
            }
            else {
                var arrayProgram = _UserProgramInput.split(' ');
                var processID = _MemoryManager.load(arrayProgram, 1);
                _StdOut.putText("Process ID: " + processID);
            }

        }

        public shellRun(args: string[]) {
            if (args.length > 0) {
                var pid = parseInt(args[0]);
                if (isNaN(pid)) {
                    _StdOut.putText("Must provide a valid number");
                }
                else if (_MemoryManager.doesProcessExist(pid)) {
                    _CPU.runProcess(pid);
                }
                else {
                    _StdOut.putText("No process with pid " + pid + " in memory");
                }
            }
            else {
                _StdOut.putText("Usage: run <pid> Please supply a PID");
            }
        }

        public shellClearMem(args: string[]) {
            if (!_CPU.isExecuting) {
                _Memory.clearMemory();
                TSOS.Control.updateMemoryDisplay();
                _StdOut.putText("Memory cleared."); 
            }
            else {
                _StdOut.putText("Memory can't be cleared while the CPU is executing.");
            }

        }

        public shellRunAll(args: string[]) {
            _CPU.runAllProcesses();
        }

        public shellPs(args: string[]) {
            var processes = _MemoryManager.getAllRunningProcesses();
            if (processes.length === 0) {
                _StdOut.putText("There are no running processes");
            }
            else {
                _StdOut.putText("Running Processes: ");
                for (var process in processes) {
                    _StdOut.putText(processes[process].processID + " ");
                }
            }
        }

        public shellKill(args: string[]) {
            if (args.length === 0) {
                _StdOut.putText("Must provide a pid to kill");
            }
            else {
                var pid = parseInt(args[0]);
                if (isNaN(pid)) {
                    _StdOut.putText("pid must be an integer");
                }
                else {
                    if (_MemoryManager.doesProcessExist(pid)) {
                        _MemoryManager.killProcess(pid);
                        _StdOut.putText("Process with pid " + pid + " has been killed.")
                }
                    else {
                        _StdOut.putText("Process with pid " + pid + " does not exist.")
                    }  
                }
            }
        }

        public shellKillAll(args: string[]) {
            var processes = _MemoryManager.getAllRunningProcesses();
            for (var process in processes) {
                _MemoryManager.killProcess(process);
            }
            _StdOut.putText("All processes have been killed.");
        }

        public shellQuantum(args: string[]) {
            if (args.length === 0) {
                _StdOut.putText("Must provide a quantum.");
            }
            else {
                var quantum = parseInt(args[0]);
                //is Not a Number - returns true if not a number
                if (isNaN(quantum)) {
                    _StdOut.putText("Quantum must be an integer");
                }
                else if (quantum <= 0) {
                    _StdOut.putText("Quantum can't be zero or negative.");
                }
                else {
                    _CpuScheduler.setQuantum(quantum);
                    _StdOut.putText("Quantum set to " + quantum);
                }
            }
        }

        public shellFormat(args: string[]) {
            //Format command initializes all tracks, sectors and blocks on the disk
            if (_CPU.isExecuting) {
                _StdOut.putText("Cannot format the disk while the CPU is running.")
            }
            else {
                _krnDiskDriver.formatDisk();
                _IsDiskFormatted = true;
                _StdOut.putText("Disk has been formatted.");
            }
        }

        public shellCreate(args: string[]) {
            var filename = args[0];
            if (_IsDiskFormatted) {
                if (filename === undefined) {
                    _StdOut.putText("Must provide a filename to create.");
                }
                else if (_krnDiskDriver.createFile(filename)){
                    _StdOut.putText("File " + filename + " has been created.");
                    TSOS.Control.updateDiskDisplay();
                }
                else {
                    _StdOut.putText("File " + filename + " already exists.");
                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }

        public shellRead(args: string[]) {
            if (_IsDiskFormatted) {
                var fileName = args[0];
                if (fileName === undefined) {
                    _StdOut.putText("Must provide a file name to read from.");
                }
                else {
                    var fileData = _krnDiskDriver.readFile(fileName, undefined, undefined, undefined);
                    if (fileData != null) {
                        _StdOut.putText("Contents of file " + fileName + ": " + fileData);
                    }
                    else {
                        _StdOut.putText("File " + fileName +  " doesn't exist and cannot be read.");
                    }
                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }

        public shellWrite(args: string[]) {
            if (_IsDiskFormatted) {
                //First parameter is file name, need to remove quotes from second parameter
                var fileName = args[0];
                if (fileName === undefined) {
                    _StdOut.putText("Must provide a file name to write to.");
                }
                else {
                    //var dataToWrite = args[1].replace('"', '').replace('"', '');
                    var writeFirst = args[1];
                    var writeLast = args[args.length - 1];
                    var dataToWrite = "";
                    if ((writeFirst.charAt(0) === "\"") && (writeLast.charAt(writeLast.length - 1) === "\"")) {
                        if (args.length == 2) {
                            dataToWrite = writeFirst.substring(1, (writeFirst.length - 1));
                        }
                        else {
                            dataToWrite = writeFirst.substring(1, writeFirst.length) + " ";
                            for (var i = 2; i < args.length - 1; i++) {
                                dataToWrite += args[i] + " ";
                            }
                            dataToWrite += writeLast.substring(0, writeLast.length - 1);
                        }

                        if (_krnDiskDriver.writeToFile(fileName, dataToWrite)) {
                            _StdOut.putText("File updated: " + fileName);
                            TSOS.Control.updateDiskDisplay();
                        }
                        else {
                            _StdOut.putText("File " + fileName + " doesn't exist and can't be written to.");
                        }
                    }
                    else {
                        _StdOut.putText("Must enter file name followed by text to write in quotation marks.");
                    }
                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }
        

        public shellDelete(args: string[]) {
            if (_IsDiskFormatted) {
                var fileName = args[0];
                if (fileName === undefined) {
                    _StdOut.putText("Must provide a file name to delete.");
                }
                else {
                    if (_krnDiskDriver.deleteFile(fileName)) {
                        _StdOut.putText("File " + fileName + " has been deleted.");
                        TSOS.Control.updateDiskDisplay();
                    }
                    else {
                        _StdOut.putText("File " + fileName + " doesn't exist and couldn't be deleted");
                    }
                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }

        public shellCopy(args: string[]) {
            if (_IsDiskFormatted) {
                var fileName = args[0];
                var newFileName = args[1];
                if (fileName === undefined || newFileName === undefined) {
                    _StdOut.putText("Must provide an existing file name followed by a new file name to copy to.");
                }
                else {
                    if (_krnDiskDriver.copyFile(fileName, newFileName)) {
                        _StdOut.putText("File " + newFileName + " has been created with contents from " + fileName);
                        TSOS.Control.updateDiskDisplay();
                    }
                    else {
                        _StdOut.putText("Error copying files: either the first file name doesn't exist, or the second one does.");
                    }

                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }

        public shellRename(args: string[]) {
            if (_IsDiskFormatted) {
                var fileName = args[0];
                var newFileName = args[1];
                if (fileName === undefined || newFileName === undefined) {
                    _StdOut.putText("Must provide an existing file name followed by the new file name.");
                }
                else {
                    if (_krnDiskDriver.renameFile(fileName, newFileName)) {
                        _StdOut.putText("File " + fileName + " has been renamed to " + newFileName);
                        TSOS.Control.updateDiskDisplay();
                    }
                    else {
                        _StdOut.putText("File " + fileName + " doesn't exist and can't be renamed.");
                    }
                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }

        public shellLs(args: string[]) {
            if (_IsDiskFormatted) {
                var fileList = _krnDiskDriver.listFiles();
                if (fileList.length > 0) {
                    _StdOut.putText("Current files: ");
                    _StdOut.advanceLine();
                    for (var i = 0; i < fileList.length; i++) {
                        _StdOut.putText(fileList[i]);
                        _StdOut.advanceLine();
                    }
                }
                else {
                    _StdOut.putText("There are currently no files on the disk.");
                }
            }
            else {
                _StdOut.putText("Disk is not formatted.");
            }
        }

        public shellSetSchedule(args: string[]) {
            if (args.length === 0) {
                _StdOut.putText("Must provide a string for scheduling algorithm.");
            }
            else {
                //check for contents of string for RR or FCFS
                var scheduleMode = args[0].toLowerCase();
                if (scheduleMode === "rr" || scheduleMode === "fcfs") {
                    _CpuScheduler.setSchedulingMode(scheduleMode);
                    _StdOut.putText("Scheduling mode has been changed to " + scheduleMode);
                }
                else {
                    _StdOut.putText("Must provide a valid scheduling algorithm (RR or FCFS).")
                }
            }
        }

        public shellGetSchedule(args: string[]) {
            //return the schedule from cpu scheduler
            _StdOut.putText(_CpuScheduler.getScheduleMode());
        }

    }
}
