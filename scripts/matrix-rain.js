// Matrix rain animation functionality
function createMatrixRain() {
    const matrixRain = document.getElementById('matrix-rain');
    const terminalContainer = document.getElementById('terminal-container');
    
    if (!matrixRain || !terminalContainer) return;
    
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?';
    const containerRect = terminalContainer.getBoundingClientRect();
    const columns = Math.floor(containerRect.width / 20);
    
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

// Export for use in other modules
window.createMatrixRain = createMatrixRain;
