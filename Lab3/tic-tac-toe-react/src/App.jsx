import { useState } from 'react'
import {GameStatus} from './GameStatus.jsx'
import {Board} from './Board.jsx'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function Mark({ player }) {
  if (player === 'X') {
    return <i className="fg-danger fa-solid fa-xmark"></i>
  }

  if (player === 'O') {
    return <i className="fg-info fa-solid fa-o"></i>
  }

  return null
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  function handlePlay(index) {
    if (board[index] || winner || draw) return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    const nextWinner = getWinner(nextBoard);
    const nextDraw = !nextWinner && nextBoard.every(Boolean);

    setBoard(nextBoard);

    if (nextWinner) {
      setScores((currentScores) => ({
        ...currentScores,
        [nextWinner]: currentScores[nextWinner] + 1,
      }));
    } else if (nextDraw) {
      setScores((currentScores) => ({
        ...currentScores,
        draw: currentScores.draw + 1,
      }));
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function resetRound() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }

  return (
    <>
      <h1 className="text-center mb-4">
        Tic Tac Toe
      </h1>

      <GameStatus scores={scores} winner={winner} draw={draw}></GameStatus>

      <p className="text-center small mb-3">
        {winner ? (
          <>Player <Mark player={winner}></Mark> wins</>
        ) : draw ? (
          "Draw"
        ) : (
          <>Player <Mark player={currentPlayer}></Mark>'s turn</>
        )}
      </p>

      <Board
        board={board}
        onPlay={handlePlay}
        disabled={Boolean(winner) || draw}
      ></Board>

      <div className="text-center">
        <button
          type="button"
          className="btn btn-info rounded-pill"
          onClick={resetRound}
        >
          <i className="fa-solid fa-repeat"></i>
          New Round
        </button>
      </div>
    </>
  )
}

export default App
