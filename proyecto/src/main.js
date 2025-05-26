const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `¡${currentPlayer} gana! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "¡Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Turno de: ${currentPlayer}`;
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Turno de: X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
