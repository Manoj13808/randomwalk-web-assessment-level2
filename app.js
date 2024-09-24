const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

const X_CLASS = 'X';
const O_CLASS = 'O';
let oTurn = false;
let isGameActive = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    if (cell.innerText === '' && isGameActive) {
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass;
}

function swapTurns() {
    oTurn = !oTurn;
    setStatus();
}

function setStatus() {
    gameStatus.innerText = oTurn ? "O's Turn" : "X's Turn";
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.innerText === X_CLASS || cell.innerText === O_CLASS;
    });
}

function endGame(draw) {
    isGameActive = false;
    if (draw) {
        gameStatus.innerText = 'Draw!';
    } else {
        gameStatus.innerText = `${oTurn ? "O" : "X"} Wins!`;
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.innerText = '';
    });
    isGameActive = true;
    oTurn = false;
    setStatus();
}

setStatus();
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
restartButton.addEventListener('click', restartGame);
