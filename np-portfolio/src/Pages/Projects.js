import React, { useState } from 'react';
import { FaJs, FaReact, FaPython, FaJava, FaHtml5, FaCss3 } from 'react-icons/fa';
import { BiLogoTypescript } from "react-icons/bi";
import { TbBrandReactNative } from "react-icons/tb";
import { DiNodejs } from "react-icons/di";
import { SiMysql, SiSqlite, SiTensorflow, SiKeras, SiNumpy, SiPandas, SiCplusplus, SiSpringboot, SiApachemaven } from "react-icons/si";
import { FcLinux } from "react-icons/fc";


const projects = [
    {
        id: 1,
        title: 'SysMon+',
        description: 'A Windows based system monitoring application that monitors CPU, Memory, and Disk usage.',
        imageUrl: '/images/SysMon+_Logo.png',
        demoUrl: 'https://www.youtube.com/watch?v=vXuHGeA7HYM',
        sourceCodeUrl: 'https://github.com/NickPetrilli/MSCS710-ProcessMonitor',
        languages: ['Java', 'Java SpringBoot', 'React', 'NodeJS', 'HTML', 'CSS', 'SQLite'],
        longDescription: 'SysMon+ is a Windows based system monitoring application that monitors CPU, Memory/RAM, and disks or other storage devices.' + 
        'It also tracks all processes currently running on the system. Total utilization of CPU, Memory, etc are tracked, as well as on a per process basis.' + 
        ' The web application home page consists of glance views for CPU, Memory and Disk information. This consists of the name of their CPU, their total utilization, graphs illustrating how the utilization fluctuates over time, and a list of the top three processes for that component.' +
        ' The user can also view detailed information about each component by clicking the CPU name, the graph or the utilization display, which will display more metrics.' + 
        ' Detail view for the CPU includes the processor current speed, processor max speed, number of cores, number of processes running, and the number of threads executing. ' +
        ' The Memory detail view contains total memory installed on the system, how much of that memory is used, and how much of that memory is available.' +
        ' The Disk detail view contains the selected disks read and write speed, the amount of swap space that is currently being used, the amount of swap space available, as well as the swap utilization percentage.' +
        ' By clicking on the top processes of one of the hardware components, the user will be routed to the Process page, sorted by the usage based on the hardware component they clicked which is indicated with the gray color.' +
        ' While on the process page, users can click on the other hardware components to sort by their usage, descending, or click on the already selected component to sort ascending.' + 
        ' Using the navbar on the top of the application, users can click on the Reports button to see the average utilization across many different time intervals (minimum 5 minutes, and up to 24 hours).' +
        ' All metrics are stored in a SQLite database, and to prevent the database from getting too large, we prune it every 5 minutes to delete records that are a week old.' + 
        ' For this project, I specifically worked on the backend portion. This included collecting all the various metrics and inserting them into the database every 10 seconds, and creating the API endpoints for the frontend to fetch from.'
    },

    {
        id: 2,
        title: 'FoxLift',
        description: 'A mobile ride sharing application for students that uses Google Authentication and the Google Maps API.',
        imageUrl: '/images/FoxLift.png',
        demoUrl: '/videos/FoxLiftDemos.mp4',
        sourceCodeUrl: 'https://github.com/NickPetrilli/RideSharingApp',
        languages: ['React Native', 'JavaScript', 'MySQL', 'Linux'],
        longDescription: 'FoxLift is a mobile ride sharing application for students to carpool to shared destinations. Users begin by creating an account, which can be done by logging in via their Google account.' +
        ' After using the Google Authentication, users select if they have a car designating them as drivers, as opposed to passengers. The Home page uses the Google Maps API and allows users to select their' +
        ' orgin and destination for the ride. The route is traced and shown on the map to show the distance in miles, and the time duration for the trip. Before confirming the ride, they must select a date and time' +
        ' for the ride. The Activity page shows all upcoming trip requests from any user using the app, all past trips that occured, and a personalized page for all of your own trips (past or present).' +
        ' Other drivers and passengers can browse the Activity page to join in on rides if they want to go to the same destination. They can filter by destination or give a range of times to see what trips are occurring then.' +
        ' Once a desired ride is found, users can click on the ride and join in on it. Once joined, they will now have the option to message any other users that are in on that ride to coordinate. To protect anonymity, when a user creates an account' +
        ' they are given a random combination of a color, followed by an animal. Only you can see your name and email on your profile, available on the Profile page, while other users can only see your pseudoname. The Profile page also stores your favorite' +
        ' locations, for easier access for future rides. This can be done via the Home page, typing in the destination in the Google Maps section, and clicking "Add to Favorites". The Profile page also gives the user the ability to log out,' +
        ' and lists the terms and conditions for using the app. I worked on the frontend portion of the app, incorporating the Google Maps API on the Home page and features in the Activity and Messaging pages. The application is hosted on a Linux server' +
        ' and all data is stored in a MySQL database.'
    },

    {
      id: 3,
      title: 'NickOS',
      description: 'A browser based operating system.',
      imageUrl: '/images/OS.png', 
      demoUrl: '/NickOS/index.html',
      sourceCodeUrl: 'https://github.com/NickPetrilli/OperatingSystems',
      languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
      longDescription: 'NickOS is a browser-based Operating System in TypeScript. The operating system project is an evolving multi-phase endeavor designed to enhance and expand an OS capabilities.' +  
        ' It begins with fundamental improvements including customizing system commands, adding new shell functionalities, and enhancing the visual elements such as a graphic task bar that displays real-time status messages and system time.' + 
        ' The project also focuses on refining the command-line interface by implementing features like scrolling, handling special characters, and command history, while also adding new error-handling capabilities.' + 
        ' In the second phase, the project advances by integrating memory management and process control functionalities. It involved loading 6502 machine language code into memory, creating and managing process control blocks (PCBs), and executing programs while updating system status in real time.' +  
        ' Key features include real-time synchronization with CPU cycles, command-based execution of programs, and the ability to manage multiple programs with single-step execution and interruption capabilities.' + 
        ' The third phase further develops the OS by enabling concurrent execution of multiple user programs. This includes implementing Round Robin scheduling, managing process queues, and adding commands to handle memory partitions, process management, and system status display.' +
        ' Enhancements in this phase focus on efficient process scheduling, context switching, and error handling.' + 
        ' The final phase introduces a local file system and virtual memory management to support more processes than the available physical memory. This involves implementing disk operations such as file creation, reading, writing, and deletion, and developing a disk system driver.' + 
        ' The project also incorporates virtual memory techniques to manage process swapping between memory and disk, ensuring the OS can handle multiple concurrent processes efficiently.' + 
        ' Overall, the project aims to create a sophisticated OS simulation with enhanced functionalities, including custom commands, improved memory management, and advanced process and file system handling. Each phase builds upon the previous, culminating in a robust and versatile operating system prototype. '
    },

    {
    id: 4,
    title: 'Charlie',
    description: 'A client-server Java based Blackjack application with plugins for making the correct play according to the basic strategy, and making the correct bet by card counting.',
    imageUrl: '/images/charlie.png',
    demoUrl: '/videos/Charlie-demo.webm',
    sourceCodeUrl: 'https://github.com/NickPetrilli/Charlie',
    languages: ['Java', 'Maven'],
    longDescription: 'Charlie is a client-server based Blackjack application written in Java. The name Charlie comes from the rule that if the player hand has 5 cards with values less than or equal to 21, it is an automatic win.' +
    ' I was given a base version of the project, and added plugins for enhancing the playing experience. ' + 
    ' First I added different side bet rules, including all combinations of Super 7, Exactly 13, and Royal Match with their different payout amounts. I also implemented the basic strategy, analyzing' + 
    ' the current player hand and the dealer up card with an advisor to popup with advice of the correct play. Next, I implemented the Hi-Lo card counting strategy, which includes a running count and true count' +
    ' to calculate the most optimal bet. The running count is calculated like this: A, 10, J, Q, K → Add -1 to count, 2 - 6 → Add +1 to count, 7 - 9 → Add 0 to count, and the count resets when the deck is shuffled.' +
    ' The true count is calculated by dividing the running count by the number of decks remaining in the shoe. This true count is the optimal number of chips to bet, essentially trying to predict if a favorable hand will come next, resulting in a larger bet.' +
    ' While the player has the option to use the advisor to make the correct play according to the basic strategy, I implemented two bots to play alongside with that always make the correct play.' +
    ' To verify the game always plays correctly, I implemented JUnit tests for all possibilities of invalid hands, either from the dealer or player. These tests check if any of the card values are negative, null, or equal to blackjack or charlie.' +
    ' Also, within each of the 4 sections of the basic strategy, I implemented tests for many of the edge cases, to ensure the robustness and stability the correct play is always advised. '
    },

    {
    id: 5,
    title: 'tsiraM-6502',
    description: 'A virtual 6502 microprocessor.',
    imageUrl: '/images/tsiraM.jpeg', 
    demoUrl: '',
    sourceCodeUrl: 'https://github.com/NickPetrilli/tsiraM-6502',
    languages: ['TypeScript'],
    longDescription: 'tsiraM-6502 simulates a 6502 microprocessor system, encompassing various hardware components and their interactions, focusing on CPU execution, memory management, and interrupt handling.' + 
    ' The System class initializes and manages the interaction between various hardware components, including the CPU, memory, clock, MMU (Memory Management Unit), interrupt controller, and keyboard. It sets up the clock to generate pulses at regular intervals, driving the entire system.' +
    ' The CPU class simulates the 6502 CPU by implementing a fetch-decode-execute cycle on the 6502 instruction set, executing instructions, and handling interrupts. This cycle includes:' + 
    ' Fetch: Reads the next instruction from memory. Decode: Deciphers the fetched instruction to determine the operation. Execute: Performs the specified operation, which may involve arithmetic, memory access, or control flow changes.' +
    ' Write Back: Writes results back to memory if necessary. Interrupt Check: Checks for and handles any pending interrupts. The CPU processes instructions through a series of pipeline steps, including handling instructions requiring multiple decode or execute phases. It interacts with memory via the MMU, fetching instructions and data and writing results back to memory.' +
    ' The Memory class extends Hardware and implements the ClockListener interface, simulating RAM with an addressable space. It includes methods for reading, writing, resetting, and displaying memory content. The MMU class extends Hardware and interfaces with the Memory class to manage memory addresses and data.' +
    ' It provides methods for reading and writing memory, setting and getting memory address and data registers, and converting addresses to little-endian format. The MMU also includes methods for loading and dumping memory content, facilitating memory operations for the CPU.' +
    ' The InterruptController class extends Hardware and manages interrupts generated by I/O devices. It keeps track of registered devices (ioDevices) and an interrupt queue (interruptQueue). It provides methods to add devices, accept interrupts, sort the interrupt queue by priority, and handle the highest priority interrupt.' +  
    ' The Keyboard class, extending Hardware and implementing the Interrupt interface, simulates a keyboard device that generates interrupts. It captures key presses, stores them in an output buffer, and triggers interrupts handled by the interrupt controller. The serviceInterrupt method processes and prints the buffered key presses, demonstrating a complete interrupt handling cycle.' +
    ' Overall, this TypeScript code provides a comprehensive simulation of a 6502 microprocessor system, demonstrating the interaction between various hardware components, the execution of CPU instructions, and the handling of interrupts. The simulation models the behavior of a computer system through structured and modular components, showcasing fundamental concepts in computer architecture and system design.'
    },

    {
    id: 6,
    title: 'Covid-19 Pooled Testing Simulator',
    description: 'Developed pooled testing simulator based on the system used at Marist College to test students for covid.',
    imageUrl: '/images/covid.jpg', 
    demoUrl: '',
    sourceCodeUrl: 'https://github.com/NickPetrilli/Algorithms/tree/main/Projects/Semester%20Project',
    languages: ['Java'],
    longDescription: 'The COVID-19 Pooled Testing Simulator is a Java-based application designed to simulate the process of pooled testing for detecting COVID-19 infections within a population.' + 
    ' Pooled testing is an efficient method that involves grouping individuals and testing them collectively, reducing the number of tests needed compared to individual testing. This simulation helps understand how pooled testing can be implemented and its effectiveness in identifying infected individuals in a large population.' +

    ' The user is prompted to enter the population size (e.g., 1,000, 10,000, 100,000, or 1,000,000).' +
    ' A list of Person objects is created to represent the population. The addPeople method adds the specified number of Person objects to the list, each initially marked as not sick.' +
    ' Infection Simulation:' +

    ' The infection rate is set to 2%, meaning that 2% of the population will be randomly infected with the disease.' +
    ' The giveDisease method iterates through the list of people and infects individuals based on the infection rate. A random number between 0 and 100 is generated for each person, and if it is less than the infection rate (2), the person is marked as infected.' +
    ' Pooled Testing:' +

    ' The population is split into groups of 8 individuals using the splitInGroups method.' +
    ' Each group is tested collectively:' +
    ' If a group shows no infection, all members of the group are considered healthy.' +
    ' If a group shows infection, it is further split into two smaller groups of 4 individuals each using the splitInTwo method.' +
    ' Each smaller group is tested:' +
    ' If one of the smaller groups shows no infection, all members of that group are considered healthy, and the other group is tested individually.' +
    ' If both smaller groups show infection, each member of both groups is tested individually to identify the infected individuals.' +
    ' Results:' +

    ' The total number of tests conducted is counted and printed at the end of the simulation. This count helps in understanding the efficiency of pooled testing in reducing the number of tests compared to individual testing.' +
    ' After running the simulation 3 times, the averages for the number of test results are: ' +
    ' 1,000 People - 255 Tests ' +
    ' | 10,000 People - 2,560 Tests,' +
    ' | 100,000 People - 25,686 Tests,' +
    ' | 1,000,000 People - 256,206 Tests.' + 
    ' The results demonstrate the effectiveness of pooled testing in reducing the number of tests required to identify people infected, resulting in 1 test for about 4 people.' 
    },

    {
    id: 7,
    title: 'AI Labs',
    description: 'Created convolutional neural networks with backpropagation for the Iris, MNIST, and Fashion MNIST datasets.',
    imageUrl: '/images/neural-network.jpg', 
    demoUrl: '',
    sourceCodeUrl: 'https://github.com/NickPetrilli/AI',
    languages: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy'],
    longDescription: 'Lab 1: Introduction to Google Colab and TensorFlow.' +
    ' Lab 2: Focuses on practicing Python programming with input-output operations in Google Colab. The lab involves working with the Iris dataset, a well-known dataset in AI that includes both continuous and categorical data.' +  
    ' For this lab, instead of using advanced libraries like TensorFlow, Pandas, or NumPy for this exercise, we relied on basic Python functionality. The tasks include downloading a CSV file of the Iris dataset, inspecting it, and calculating statistics such as the minimum and maximum values for flower measurements, and the counts of different species.' + 
    ' Then, we ran the Python code to process the data, correct initial errors in statistics, and complete specific tasks involving reading and processing the dataset line by line.' + 
    ' Lab 3: Continues the practice with Python programming and building off lab 2, specifically focusing on data handling in Google Colab. The lab uses the Iris dataset to explore Pythons input-output capabilities without relying on advanced libraries like Pandas or NumPy.' + 
    ' I was instructed to download a CSV file, inspect it in Excel, and calculate the minimum and maximum values for various iris measurements, as well as the counts of different flower species. The tasks involve running Python code to process the data, with special attention to correcting initial errors in statistics and using list comprehensions and arrays.' +
    ' Lab 4: Focuses on loading and encoding the Iris dataset using Pandas and various data preprocessing techniques in Google Colab. The lab starts by importing the dataset from a CSV file and performing initial data inspection and randomization.' +  
    ' I was guided through generating summary statistics, checking for missing values, and analyzing the data with correlation matrices and visualizations such as histograms, scatter plots, box plots, and bar plots. The lab also includes steps for normalizing numeric columns using MinMaxScaler, denormalizing data, one-hot encoding the categorical species column, and finally combining all processed data into a single DataFrame.' +
    ' Lab 5: Focuses on building and training a neural network model for XOR classification using TensorFlow and Keras. The lab begins with uploading and reading an Excel file containing XOR data using Pandas. The data, which includes input features (X1, X2, X3) and output labels (Y1), is then processed into numpy arrays.' + 
    ' A neural network model is constructed with one hidden layer and an experimental bias initializer, compiled with the Adam optimizer and binary cross-entropy loss. The model is trained over 2,000 epochs with periodic diagnostics provided by a custom callback. After training, the models predictions are evaluated against the input data, showing the models performance in predicting XOR outputs.' + 
    ' The lab demonstrates the practical application of neural networks in solving simple logical problems and includes steps for data loading, model construction, training, and evaluation.' +
    ' Lab 6: The task of this lab was to develop a model for classifying iris data. The notebook starts with importing the Pandas library and loading the iris dataset. Next, I needed to shuffle and normalize the data, and then to one-hot encode the species column.' +  
    ' The data is split into training and testing sets, and a neural network model is built using TensorFlow Keras, featuring an input layer, a hidden layer with 8 nodes, and an output layer with 3 nodes. The model is compiled with categorical crossentropy loss and trained with a batch size of 8 over 3000 epochs. Predictions are made on the test set, and the accuracy is calculated. The output includes a comparison of actual versus predicted labels, with an accuracy of 96.7%.' +
    ' Lab 7: Focuses on implementing k-nearest neighbor classification using the Iris dataset. k-NN is a simple, non-parametric algorithm used for classification and regression, where the output is determined by the majority vote of the k closest neighbors to a given data point. The lab requires modifying code to generate markdown outputs for different random states.' +
    ' Starting with importing and normalizing the dataset, the lab progresses through one-hot encoding, splitting data, and training a k-nearest neighbor classifier. The task involves testing with various random states (42, 44, and a specific one derived from the students ID) and comparing prediction results with actual labels to compute accuracy.' +
    ' Lab 8: Aims to explore the MNIST dataset, a renowned benchmark for computer vision and optical character recognition (OCR). The MNIST dataset consists of thousands of grayscale images of handwritten digits from 0 to 9, each paired with a label. It includes both training (60,000 images) and testing (10,000 images) sets.' + 
    ' The lab involves determining the minimum canvas size required to contain each digit without unnecessary padding. I was tasked with creating a function to compute this minimum size, improving upon an initial, flawed version provided by ChatGPT. The lab also covers basics of color theory, focusing on RGB color encoding, and demonstrates how to render and manipulate MNIST images using Python libraries.' +  
    ' It highlights a bug in the initial implementation and tasked me to debug and fix it to ensure accurate results in cropping images to their minimal bounding boxes.' +
    ' Lab 9: Focuses on exploring Convolutional Neural Networks (CNNs) using the MNIST dataset. CNNs are a specialized type of neural network designed for handling grid-like data such as images.' +  
    ' They consist of convolutional layers, which apply filters to detect features in images, activation functions like ReLU to introduce non-linearity, pooling layers to reduce dimensionality, and fully connected layers for classification.' + 
    ' The lab covers the process of implementing a CNN, starting with data preparation, including loading, reshaping, and normalizing the MNIST dataset. I then built and trained a CNN model using Keras, involving the forward pass where data is processed through the network, loss calculation, and backpropagation, which adjusts the networks weights using gradients computed through the chain rule.' + 
    ' Gradient descent is used to minimize the loss function by iteratively updating weights based on their gradients. The lab concludes with model evaluation on test data and required the modification of code to visualize and analyze predictions, especially focusing on incorrect ones. ' + 
    ' Lab 10: Lab 10 is designed to explore convolutional neural networks (CNNs) using the Fashion MNIST dataset. The Fashion MNIST dataset is another benchmark for image classifications, now using clothing articles rather than handwritten digits. The lab starts with dataset preparation, where the Fashion MNIST data is loaded and preprocessed to be compatible with CNNs, and the images are reshaped and normalized to fit the models requirements.' + 
    ' The core of the lab involves constructing a CNN model with Keras, featuring convolutional layers for feature extraction, max-pooling layers for dimensionality reduction, and fully connected layers for classification. The model is compiled with the Adam optimizer and trained using sparse categorical cross-entropy loss over five epochs. After training, the models performance is evaluated on a test set, and predictions are made.' +  
    ' The final step requires modifications to visualize and analyze specific predictions, especially focusing on misclassifications.' 
    },

    {
    id: 8,
    title: 'Parallel Processing',
    description: 'Created programs to parse large text files and count each word frequency in parallel using C++ threads, OpenMP, MPI, and CUDA.',
    imageUrl: '/images/microchip.jpg', 
    demoUrl: '',
    sourceCodeUrl: 'https://github.com/NickPetrilli/ParallelProcessing',
    languages: ['C++', 'Python'],
    longDescription: 'Project 1: C++ Threads Pattern Matching: This project begins with a serial implementation of the pattern matching algorithm in C++. The program reads the input text and pattern files into memory using standard file I/O operations.' + 
    ' The core of the algorithm involves a nested loop: the outer loop iterates through each possible starting position in the input text, and the inner loop compares the subsequent characters with the pattern. A match is identified if all characters align or if the wildcard (*) is encountered, which can match any character.' +
    ' The results, specifically the starting positions of each match, are then written to an output file. This project establishes the baseline performance metrics for subsequent parallel implementations.' +
    ' Project 2: OpenMP Pattern Matching: In this project, the serial pattern matching algorithm is parallelized using OpenMP to take advantage of multi-core CPU architectures. The input and pattern files are read similarly to the serial version. The key difference lies in the parallelization of the outer loop using OpenMP pragmas.' + 
    ' The #pragma omp parallel for directive is used to distribute the iterations of the outer loop across multiple threads, each processing a different segment of the input text. The threads work independently but share the result data structure, necessitating synchronization mechanisms to avoid race conditions. The aggregated results from all threads are then written to the output file.' +  
    ' This implementation demonstrates how straightforward it can be to parallelize loops in C++ using OpenMP, resulting in significant reductions in execution time on multi-core systems.' + 
    ' Project 3: MPI Pattern Matching: This project implements the pattern matching algorithm using the Message Passing Interface (MPI) to run on distributed memory systems, such as a cluster of computers. The input text is divided among multiple MPI processes, with each process handling a distinct portion of the text.' +
    ' The MPI_Scatter function is used to distribute segments of the input text to each process. Each process then performs the pattern matching independently on its assigned segment. The results from all processes are gathered using the MPI_Gather function, where the master process collects and aggregates the results.' +  
    ' Finally, the combined results are written to an output file. This implementation highlights the use of MPI for parallel computing across multiple machines, demonstrating significant performance gains for large-scale data processing.' + 
    ' Project 4: CUDA Pattern Matching: In this project, the pattern matching algorithm is parallelized using CUDA to run on a GPU. The input text and pattern data are transferred to the GPUs global memory using CUDA memory transfer functions.' +
    ' The pattern matching is then performed in parallel by thousands of CUDA threads. Each thread is responsible for checking a potential match starting at a specific position in the input text. The CUDA kernel is designed to efficiently utilize the GPUs architecture, with each thread performing a lightweight comparison and writing the results to a shared output array.' + 
    ' After the kernel execution, the results are transferred back to the CPU for further processing and writing to the output file. This implementation showcases the massive parallel processing power of modern GPUs and the intricacies of GPU programming, such as memory management and kernel optimization, to achieve substantial speedups for computationally intensive tasks.' +
    ' For each project, I wrote python files using psutil to monitor the CPU/GPU runtime and memory usage of each file, and for each different iteration of threads for comparison. '
  },
    
];

// Language icons mapping
const languageIcons = {
  'JavaScript': <FaJs style={{ color: '#F7DF1E' }} />, // Yellow
  'TypeScript': <BiLogoTypescript style={{ color: '#1572B6' }} />, //Blue
  'React': <FaReact style={{ color: '#61DAFB' }} />, // Light blue
  'React Native': <TbBrandReactNative style={{ color: '#61DAFB' }} />, // Light blue
  'Python': <FaPython style={{ color: '#306998' }} />, // Dark blue
  'TensorFlow': <SiTensorflow style={{ color: 'FF8C00' }} />, //Orange  
  'Keras': <SiKeras style={{ color: '#E34F26' }} />, //Red
  'Pandas': <SiPandas style={{ color: '#306998' }} />, //Dark blue
  'NumPy': <SiNumpy style={{ color: '#7B68EE' }} />, //Light purple
  'Java': <FaJava style={{ color: '#E34F26' }} />, // Red
  'Java SpringBoot': <SiSpringboot style={{ color: '#008000' }} />, //Green
  'Maven': <SiApachemaven style={{ color: '#E34F26' }} />, //Red
  'HTML': <FaHtml5 style={{ color: '#E34F26' }} />, // Red
  'CSS': <FaCss3 style={{ color: '#1572B6' }} />, // Blue
  'NodeJS': <DiNodejs style={{ color: '#008000' }} />, //Green
  'MySQL': <SiMysql style={{ color: '#1572B6' }} />, //Blue
  'SQLite': <SiSqlite style={{ color: '#1572B6' }} />, //Blue
  'C++': <SiCplusplus style={{ color: '#1572B6' }}  />, //Blue
  'Linux': <FcLinux />
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleCardClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: 'black', minHeight: '100vh', overflowY: 'auto' }}>
            <h1 style={{ textAlign: 'center', color: '#f9f9f9' }}> My Projects </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => handleCardClick(project)}
                        style={{
                            background: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            width: '300px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto',
                            justifyContent: 'space-between',
                            paddingBottom: '1rem'
                        }}
                    >
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                        />
                        <div style={{ padding: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>{project.title}</h2>
                            <p>{project.description}</p>
                            <div style={{ marginTop: 'auto' }}>
                                {project.demoUrl && project.demoUrl.trim() !== '' && (
                                    <a 
                                        href={project.demoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ marginRight: '1rem', color: '#007bff', textDecoration: 'none' }}
                                    >
                                        View Demo
                                    </a>
                                )}
                                <a 
                                    href={project.sourceCodeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ color: '#007bff', textDecoration: 'none' }}
                                >
                                    View Code
                                </a>
                            </div>
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'center', 
                            gap: '0.5rem', 
                            padding: '1rem', 
                            borderTop: '1px solid #eee' 
                        }}>
                            {project.languages.map(language => (
                                <div key={language} title={language} style={{ fontSize: '1.5rem', color: '#333' }}>
                                    {languageIcons[language]}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
    
            {selectedProject && (
                <div 
                    onClick={handleCloseModal}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000 // Ensures modal is on top
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            width: '80%',
                            maxWidth: '800px',
                            height: '80vh',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                        }}
                    >
                        <button 
                            onClick={handleCloseModal} 
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            &times;
                        </button>
                        <img 
                            src={selectedProject.imageUrl} 
                            alt={selectedProject.title} 
                            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                        />
                        <div style={{ padding: '1rem', overflowY: 'auto' }}>
                            <h2 style={{ fontSize: '2rem' }}>{selectedProject.title}</h2>
                            <p>{selectedProject.longDescription || selectedProject.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                {selectedProject.demoUrl && selectedProject.demoUrl.trim() !== '' && (
                                    <a 
                                        href={selectedProject.demoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ marginRight: '1rem', color: '#007bff', textDecoration: 'none' }}
                                    >
                                        View Demo
                                    </a>
                                )}
                                <a 
                                    href={selectedProject.sourceCodeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ color: '#007bff', textDecoration: 'none' }}
                                >
                                    View Code
                                </a>
                            </div>
                            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                                {selectedProject.languages.map(language => (
                                    <div key={language} title={language} style={{ fontSize: '1.5rem', color: '#333' }}>
                                        {languageIcons[language]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;