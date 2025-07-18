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
        
        // Trigger print dialog
        window.print();
        
        // Restore buttons after print dialog
        setTimeout(() => {
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

