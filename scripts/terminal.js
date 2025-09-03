// Terminal functionality
class Terminal {
    constructor() {
        this.terminalContainer = document.getElementById('terminal-container');
        this.terminalClose = document.getElementById('terminal-close');
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');
        this.terminalOverlay = document.getElementById('terminal-overlay');
        this.terminalToggle = document.getElementById('terminal-toggle');
        
        this.commands = {
            help: {
                action: () => {
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
                action: () => {
                    return `KONSTANTINOS TSANAKTSIS - Backend Developer

Backend developer with 2+ years of professional experience in C# and cloud technologies. Expertise in scalable microservice architectures, Azure infrastructure management, and secure payment systems. Proven track record in enterprise and startup environments.`;
                }
            },
            experience: {
                action: () => {
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
                action: () => {
                    return `TECHNICAL SKILLS:

Languages:
• C#, Python, Bash, SQL

Cloud & Infrastructure:
• Azure, Kubernetes, Docker, Terraform

Tools:
• Stripe, Meta/Google Ads APIs, Celery, RabbitMQ, OpenResty, Nginx

Technologies:
• Django, PostgreSQL, MySQL, REST APIs, JWT, LINQ, .NET, Azure DevOps`;
                }
            },
            education: {
                action: () => {
                    return `EDUCATION & SERVICE:

Computer Science BSc
University of Crete (September 2018 – December 2023)
• Completed comprehensive computer science curriculum
• Specialized in backend development and systems programming

Greek Military Service
Cyprus (November 2024 – July 2025)
• Completed mandatory military service`;
                }
            },
            contact: {
                action: () => {
                    return `CONTACT INFORMATION:

Phone: (+30) 6987325635
Email: kostas.tsan@hotmail.com
LinkedIn: linkedin.com/in/ktsanaktsis
GitHub: github.com/kostastsanak`;
                }
            },
            military: {
                action: () => {
                    return `MILITARY SERVICE:

Greek Military Service in Cyprus
November 2024 – July 2025
• Completed mandatory military service`;
                }
            },
            languages: {
                action: () => {
                    return `LANGUAGES:

• Greek: Native
• English: Proficient`;
                }
            },
            clear: {
                action: () => {
                    this.resetTerminal();
                    return null;
                }
            },
            exit: {
                action: () => {
                    this.closeTerminal();
                    return null;
                }
            }
        };
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Terminal toggle
        this.terminalToggle.addEventListener('click', () => this.openTerminal());
        
        // Terminal close
        this.terminalClose.addEventListener('click', () => this.closeTerminal());
        
        // Close terminal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.terminalContainer.classList.contains('active')) {
                this.closeTerminal();
            }
        });
        
        // Click handling for terminal focus
        this.terminalContainer.addEventListener('click', (e) => {
            if (e.target === this.terminalContainer || e.target === this.terminalOutput) {
                this.terminalInput.focus();
            }
        });
        
        // Focus on any key press when terminal is active
        document.addEventListener('keydown', (e) => {
            if (this.terminalContainer.classList.contains('active') && e.target !== this.terminalInput && e.key !== 'Escape') {
                this.terminalInput.focus();
            }
        });
        
        // Handle terminal input
        this.terminalInput.addEventListener('keydown', (e) => this.handleInput(e));
        
        // Handle animation end events
        this.terminalContainer.addEventListener('animationend', (e) => {
            if (e.animationName === 'terminal-popup-close') {
                this.terminalContainer.classList.remove('closing');
            }
        });
        
        // Update matrix rain on window resize
        window.addEventListener('resize', () => {
            if (this.terminalContainer.classList.contains('active')) {
                setTimeout(() => window.createMatrixRain(), 100);
            }
        });
    }
    
    openTerminal() {
        this.terminalContainer.classList.remove('closing');
        this.terminalContainer.classList.add('active');
        
        // Show overlay and prevent scrolling
        this.terminalOverlay.classList.remove('hidden');
        document.body.classList.add('no-scroll');
        
        // Create matrix rain immediately when terminal opens
        setTimeout(() => {
            window.createMatrixRain();
        }, 100);
        
        this.resetTerminal();
        
        // Focus input after a short delay
        setTimeout(() => {
            this.terminalInput.focus();
        }, 200);
    }
    
    closeTerminal() {
        this.terminalContainer.classList.remove('active');
        this.terminalContainer.classList.add('closing');
        
        this.terminalOverlay.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        
        this.terminalInput.value = '';
        this.terminalInput.blur();
        document.getElementById('matrix-rain').innerHTML = '';
    }
    
    resetTerminal() {
        this.terminalOutput.innerHTML = `<div class="terminal-line"><span class="terminal-prompt">root@tsanaktsis-cv:~$</span><span class="terminal-text">Welcome to the CV Terminal Interface</span></div><div class="terminal-line"><span class="terminal-prompt">root@tsanaktsis-cv:~$</span><span class="terminal-text">Type 'help' to see available commands</span></div>`;
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.terminalInput.value.trim().toLowerCase();
            
            // Display the command
            const inputLine = document.createElement('div');
            inputLine.className = 'terminal-line';
            inputLine.innerHTML = `<span class="terminal-prompt">root@tsanaktsis-cv:~$</span><span class="terminal-command">${this.terminalInput.value}</span>`;
            this.terminalOutput.appendChild(inputLine);

            if (command === '') {
                // Empty command
            } else if (this.commands[command]) {
                const result = this.commands[command].action();
                if (result !== null) {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-line';
                    outputLine.innerHTML = `<span class="terminal-text">${result.replace(/\n/g, '<br>')}</span>`;
                    this.terminalOutput.appendChild(outputLine);
                }
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-line';
                errorLine.innerHTML = `<span class="terminal-error">Command not found: ${command}</span>`;
                this.terminalOutput.appendChild(errorLine);
                
                const helpLine = document.createElement('div');
                helpLine.className = 'terminal-line';
                helpLine.innerHTML = `<span class="terminal-info">Type 'help' to see available commands</span>`;
                this.terminalOutput.appendChild(helpLine);
            }

            this.terminalInput.value = '';
            this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.terminal = new Terminal();
});
