const board = document.getElementById("board");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreDraw = document.getElementById("score-draw");
const statusText = document.querySelector("p.text-center.small.mb-3");
const newRoundButton = document.querySelector("button.btn-info.rounded-pill");

const state = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  scores: { X: 0, O: 0, draw: 0 },
  winner: null,
  draw: false,
};

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const markIcon = (player) =>
  player === "X"
    ? '<i class="fg-danger fa-solid fa-x"></i>'
    : '<i class="fg-info fa-solid fa-o"></i>';

function getWinner(board) {
  for (const [a, b, c] of winLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function render() {
  cells.forEach((button, index) => {
    const mark = state.board[index];
    button.innerHTML = mark ? markIcon(mark) : "";
    button.disabled = Boolean(mark) || Boolean(state.winner) || state.draw;
  });

  scoreX.querySelector(".fg").textContent = state.scores.X;
  scoreO.querySelector(".fg").textContent = state.scores.O;
  scoreDraw.querySelector(".fg").textContent = state.scores.draw;

  if (state.winner) {
    statusText.innerHTML = `Player ${markIcon(state.winner)} wins`;
  } else if (state.draw) {
    statusText.textContent = "Draw";
  } else {
    statusText.innerHTML = `Player ${markIcon(state.currentPlayer)}'s turn`;
  }
}

function handleCellClick(index) {
  if (state.board[index] || state.winner || state.draw) return;

  state.board[index] = state.currentPlayer;
  state.winner = getWinner(state.board);
  state.draw = !state.winner && state.board.every(Boolean);

  if (state.winner) {
    state.scores[state.winner] += 1;
  } else if (state.draw) {
    state.scores.draw += 1;
  } else {
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  }

  render();
}

function resetRound() {
  state.board = Array(9).fill(null);
  state.winner = null;
  state.draw = false;
  state.currentPlayer = "X";
  render();
}

const cells = Array.from({ length: 9 }, (_, index) => {
  const cell = document.createElement("div");
  cell.className = "card";

  const button = document.createElement("button");
  button.className = "btn ratio ratio-1x1";
  button.addEventListener("click", () => handleCellClick(index));

  cell.appendChild(button);
  board.appendChild(cell);

  return button;
});

newRoundButton.addEventListener("click", resetRound);

render();
