// script.js

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let gameMode = ''; // Store current game mode

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

function startGame(mode) {
    gameMode = mode;
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Current player: ${currentPlayer}`;
    statusDisplay.style.color = 'black'; // Reset status display color
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick);
    });

    if (gameMode === 'vsComputer' && currentPlayer === 'O') {
        setTimeout(aiMove, 500); // Add delay before AI makes move (optional)
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    if (checkWin()) {
        showGameStatus(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (checkDraw()) {
        showGameStatus(`It's a draw!`);
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current player: ${currentPlayer}`;

        if (gameMode === 'vsComputer' && currentPlayer === 'O' && gameActive) {
            setTimeout(aiMove, 500); // Add delay before AI makes move (optional)
        }
    }
}

function aiMove() {
    // Implement AI move logic here
    // Example: Randomly select an empty cell
    let emptyCells = board.reduce((acc, val, index) => (val === '' ? [...acc, index] : acc), []);
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiMoveIndex = emptyCells[randomIndex];

    board[aiMoveIndex] = 'O';
    cells[aiMoveIndex].textContent = 'O';
    cells[aiMoveIndex].classList.add('O');

    if (checkWin()) {
        showGameStatus(`Player O wins!`);
        gameActive = false;
    } else if (checkDraw()) {
        showGameStatus(`It's a draw!`);
        gameActive = false;
    } else {
        currentPlayer = 'X'; // Switch back to human player after AI move
        statusDisplay.textContent = `Current player: ${currentPlayer}`;
    }
}

function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function showGameStatus(message) {
    statusDisplay.textContent = message;
    statusDisplay.style.color = 'green'; // Adjust styling as needed
}

