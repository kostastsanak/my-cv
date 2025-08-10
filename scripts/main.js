// Main application functionality
class CVApp {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.downloadBtn = document.getElementById('download-btn');
        
        this.initializeTheme();
        this.initializeEventListeners();
    }
    
    initializeTheme() {
        // Set dark theme as default
        document.body.classList.add('dark');
        this.themeToggle.textContent = '☀️'; // Sun icon since dark theme is active
    }
    
    initializeEventListeners() {
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // PDF download
        this.downloadBtn.addEventListener('click', () => this.downloadPDF());
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark');
        this.themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    }
    
    downloadPDF() {
        // Hide buttons temporarily for clean print
        const buttonsToHide = [
            document.querySelector('.download-toggle-container'),
            document.querySelector('.terminal-toggle')
        ];
        
        buttonsToHide.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });

        // Temporarily switch to light theme and print styles for PDF
        const originalBodyClass = document.body.className;
        document.body.className = ''; // Remove dark theme
        
        // Apply print media styles temporarily
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            body { 
                font-family: 'Segoe UI', Arial, sans-serif !important;
                font-size: 11pt !important;
                line-height: 1.3 !important;
                color: #000 !important;
                background: white !important;
            }
            main.cv { 
                max-width: 100% !important; 
                margin: 0 !important; 
                padding: 0 !important; 
            }
            section {
                background: none !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin-bottom: 8pt !important;
            }
            h2 {
                color: #0077cc !important;
                font-size: 14pt !important;
                border-bottom: 1pt solid #0077cc !important;
                margin-top: 12pt !important;
                margin-bottom: 6pt !important;
            }
            .job li strong { color: #000 !important; }
            .job { margin-bottom: 8pt !important; }
            .languages li { margin-bottom: 1pt !important; }
        `;
        document.head.appendChild(printStyles);
        
        // Trigger print dialog with clean styles
        window.print();
        
        // Restore original state after print dialog
        setTimeout(() => {
            document.body.className = originalBodyClass;
            document.head.removeChild(printStyles);
            buttonsToHide.forEach(btn => {
                if (btn) btn.style.display = '';
            });
        }, 100);
    }

}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cvApp = new CVApp();
});

