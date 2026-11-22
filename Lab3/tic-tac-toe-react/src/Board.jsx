import {Cell} from './Cell.jsx'

export function Board({ board, onPlay, disabled }) {
  return (
    <div id="board" className="grid text-center grid-cols-3 gap-1 mb-3">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onPlay(index)}
          disabled={disabled || value !== null}
        ></Cell>
      ))}
    </div>
  )
}
