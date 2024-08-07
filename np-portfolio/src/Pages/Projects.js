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
        ' After the application has run for some time, reports on average utilization are available for many different time intervals (minimum 5 minutes, and up to 24 hours).' + 
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
    longDescription: ''
  },
  {
    id: 8,
    title: 'Parallel Processing',
    description: 'Created programs to parse large text files and count each word frequency in parallel using C++ threads, OpenMP, MPI, and CUDA.',
    imageUrl: '/images/microchip.jpg', 
    demoUrl: '',
    sourceCodeUrl: 'https://github.com/NickPetrilli/ParallelProcessing',
    languages: ['C++', 'Python'],
    longDescription: ''
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