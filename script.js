const letterCanvas = document.getElementById('letter-canvas');
const drawCanvas = document.getElementById('draw-canvas');
const ctxLetter = letterCanvas.getContext('2d');
const ctxDraw = drawCanvas.getContext('2d');
const clearButton = document.getElementById('clear');
const nextLetterButton = document.getElementById('nextLetter');
const letterDisplay = document.getElementById('letter-display');

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let currentLetterIndex = 0;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Ajustar os tamanhos do canvas dinamicamente
letterCanvas.width = 500;  // Aumentando o tamanho do canvas de exibição
letterCanvas.height = 300; // Aumentando a altura do canvas de exibição
drawCanvas.width = 500;    // O canvas de desenho deve ter o mesmo tamanho
drawCanvas.height = 300;   // O canvas de desenho deve ter o mesmo tamanho

// Configurações do estilo do desenho (simulando a escrita cursiva)
ctxDraw.lineWidth = 5;
ctxDraw.lineJoin = 'round';
ctxDraw.lineCap = 'round';
ctxDraw.strokeStyle = '#333';
ctxDraw.font = '60px "Dancing Script", cursive';

// Função para desenhar a letra no canvas de exibição
function drawLetter(letter) {
    ctxLetter.clearRect(0, 0, letterCanvas.width, letterCanvas.height); // Limpar canvas antes de desenhar a próxima letra

    // Definir uma fonte maior
    ctxLetter.font = '100px "Arial'; // Aumentando o tamanho da fonte
    ctxLetter.textAlign = 'center'; // Alinhar o texto ao centro horizontalmente
    ctxLetter.textBaseline = 'middle'; // Alinhar o texto ao centro verticalmente

    // Calcular as posições para centralizar a letra no canvas
    const x = letterCanvas.width / 2; // Posição central horizontal
    const y = letterCanvas.height / 2; // Posição central vertical

    // Desenhar a letra cursiva no centro do canvas
    ctxLetter.fillText(letter, x, y); 
}

// Função para obter as coordenadas corretas no canvas
function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect(); // Obter o tamanho do canvas
    const x = event.clientX - rect.left; // Calcular a posição X relativa ao canvas
    const y = event.clientY - rect.top; // Calcular a posição Y relativa ao canvas
    return { x, y };
}

// Desenho com o mouse no canvas de desenho
drawCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const pos = getMousePos(drawCanvas, e);
    lastX = pos.x;
    lastY = pos.y;
});

drawCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(drawCanvas, e);
    const currentX = pos.x;
    const currentY = pos.y;

    ctxDraw.beginPath();
    ctxDraw.moveTo(lastX, lastY);
    ctxDraw.lineTo(currentX, currentY);
    ctxDraw.stroke();

    lastX = currentX;
    lastY = currentY;
});

drawCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

drawCanvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Limpar o canvas de desenho
clearButton.addEventListener('click', () => {
    ctxDraw.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

// Mudar para a próxima letra
nextLetterButton.addEventListener('click', () => {
    currentLetterIndex = (currentLetterIndex + 1) % alphabet.length;
    const nextLetter = alphabet[currentLetterIndex];
    drawLetter(nextLetter);
    letterDisplay.textContent = `Letra: ${nextLetter}`;
});

// Inicializar com a primeira letra
const firstLetter = alphabet[currentLetterIndex];
drawLetter(firstLetter);
letterDisplay.textContent = `Letra: ${firstLetter}`;
