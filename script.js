document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalContainer = document.getElementById('terminal-container');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const matrixRain = document.getElementById('matrix-rain');
    const terminalOverlay = document.getElementById('terminal-overlay');

    // Matrix rain animation
    function createMatrixRain() {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?';
        const columns = Math.floor(window.innerWidth / 20);
        
        matrixRain.innerHTML = '';
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * 20}px`;
            column.style.animationDuration = `${Math.random() * 3 + 2}s`;
            column.style.animationDelay = `${Math.random() * 2}s`;
            
            let columnText = '';
            const columnHeight = Math.floor(Math.random() * 10) + 5;
            for (let j = 0; j < columnHeight; j++) {
                columnText += characters.charAt(Math.floor(Math.random() * characters.length)) + '\n';
            }
            column.textContent = columnText;
            
            matrixRain.appendChild(column);
        }
    }

    // SIMPLIFIED focus function
    function focusTerminalInput() {
        if (terminalContainer.classList.contains('active')) {
            terminalInput.focus();
        }
    }

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });

    // Function to reset terminal to starting state
    function resetTerminal() {
        terminalOutput.innerHTML = `<div class="terminal-line"><span class="terminal-prompt">root@tsanaktsis-cv:~$</span><span class="terminal-text">Welcome to the CV Terminal Interface</span></div><div class="terminal-line"><span class="terminal-prompt">root@tsanaktsis-cv:~$</span><span class="terminal-text">Type 'help' to see available commands</span></div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // SIMPLIFIED terminal toggle
    terminalToggle.addEventListener('click', function() {
        terminalContainer.classList.remove('closing');
        terminalContainer.classList.add('active');
        
        // Show overlay and prevent scrolling
        terminalOverlay.classList.remove('hidden');
        document.body.classList.add('no-scroll');
        
        createMatrixRain();
        resetTerminal();
        
        // IMMEDIATE focus - no delays
        terminalInput.focus();
    });

    // Close terminal
    function closeTerminal() {
        terminalContainer.classList.remove('active');
        terminalContainer.classList.add('closing');
        
        terminalOverlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        
        terminalInput.value = '';
        terminalInput.blur();
        matrixRain.innerHTML = '';
    }

    // Handle animation end events
    terminalContainer.addEventListener('animationend', function(e) {
        if (e.animationName === 'terminal-popup-close') {
            terminalContainer.classList.remove('closing');
        }
    });

    terminalClose.addEventListener('click', closeTerminal);

    // Close terminal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && terminalContainer.classList.contains('active')) {
            closeTerminal();
        }
    });

    // SIMPLIFIED click handlers - focus on ANY click when terminal is active
    document.addEventListener('click', function(e) {
        if (terminalContainer.classList.contains('active')) {
            if (e.target !== terminalClose) {
                e.preventDefault();
                terminalInput.focus();
            }
        }
    });

    // Focus on any key press when terminal is active
    document.addEventListener('keydown', function(e) {
        if (terminalContainer.classList.contains('active') && e.target !== terminalInput) {
            terminalInput.focus();
        }
    });

    // Update matrix rain on window resize
    window.addEventListener('resize', function() {
        if (terminalContainer.classList.contains('active')) {
            createMatrixRain();
        }
    });

    // Terminal commands
    const commands = {
        help: {
            action: function() {
                return `Available commands:
• help - Show this help message
• about - Display profile information
• experience - Show work experience
• skills - List technical skills
• education - Show educational background
• contact - Display contact information
• military - Show military service info
• languages - Show spoken languages
• clear - Clear terminal screen
• exit - Close terminal`;
            }
        },
        about: {
            action: function() {
                return `KONSTANTINOS TSANAKTSIS - Backend Developer

Backend developer with over 2 years of professional experience specializing in C# and cloud technologies. Proven expertise in building scalable microservice architectures, managing Azure infrastructure, and developing secure payment systems. Experienced in both enterprise and startup environments with full ownership of critical infrastructure components.`;
            }
        },
        experience: {
            action: function() {
                return `WORK EXPERIENCE:

[2023-2024] Cloud Backend Developer @ Qrealm
• Led backend development for circular hospitality platform
• Managed Azure infrastructure and Kubernetes clusters
• Implemented Stripe payments and Meta/Google Ads APIs
• Built automated HTTPS certificate management

[2022-2023] Backend Developer @ Ecoworld SA – Greek Ferries
• Developed C# + LINQ endpoints for travel booking platform
• Optimized MySQL database queries and schemas
• Implemented data filtering and search functionality

[2018-2022] Freelance & University Projects
• Unity-based 2D games with C# networking
• Complete compiler implementation
• Various backend research projects`;
            }
        },
        skills: {
            action: function() {
                return `TECHNICAL SKILLS:

Core Languages:
• C#, Python, Bash, SQL

Cloud & Infrastructure:
• Azure, Kubernetes, Docker, Terraform, Azure DevOps

Backend Technologies:
• Django, PostgreSQL, MySQL, REST APIs, JWT, LINQ

Specialized Tools:
• Stripe, Meta/Google Ads APIs, Celery, RabbitMQ, OpenResty, Nginx`;
            }
        },
        education: {
            action: function() {
                return `EDUCATION:

Computer Science BSc
University of Crete (2018 – 2023)
• Completed comprehensive computer science curriculum
• Specialized in backend development and systems programming`;
            }
        },
        contact: {
            action: function() {
                return `CONTACT INFORMATION:

Phone: (+30) 6989876543
Email: konstantinos.tsanaktsis@gmail.com
LinkedIn: linkedin.com/in/ktsanaktsis
GitHub: github.com/tsanaktsis`;
            }
        },
        military: {
            action: function() {
                return `MILITARY SERVICE:

Greek Military Service in Cyprus
Completed mandatory military service (2024 – 2025)`;
            }
        },
        languages: {
            action: function() {
                return `LANGUAGES:

• Greek: Native
• English: Proficient`;
            }
        },
        clear: {
            action: function() {
                resetTerminal();
                return null;
            }
        },
        exit: {
            action: function() {
                closeTerminal();
                return null;
            }
        }
    };

    // Handle terminal input
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value.trim().toLowerCase();
            
            // Display the command
            const inputLine = document.createElement('div');
            inputLine.className = 'terminal-line';
            inputLine.innerHTML = `<span class="terminal-prompt">root@tsanaktsis-cv:~$</span><span class="terminal-command">${terminalInput.value}</span>`;
            terminalOutput.appendChild(inputLine);

            if (command === '') {
                // Empty command
            } else if (commands[command]) {
                const result = commands[command].action();
                if (result !== null) {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-line';
                    outputLine.innerHTML = `<span class="terminal-text">${result.replace(/\n/g, '<br>')}</span>`;
                    terminalOutput.appendChild(outputLine);
                }
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-line';
                errorLine.innerHTML = `<span class="terminal-error">Command not found: ${command}</span>`;
                terminalOutput.appendChild(errorLine);
                
                const helpLine = document.createElement('div');
                helpLine.className = 'terminal-line';
                helpLine.innerHTML = `<span class="terminal-info">Type 'help' to see available commands</span>`;
                terminalOutput.appendChild(helpLine);
            }

            terminalInput.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
});
