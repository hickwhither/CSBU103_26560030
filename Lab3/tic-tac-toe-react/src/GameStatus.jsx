export function GameStatus({scores, winner, draw}) {
  return (
    <div className="row g-2 mb-3 text-center">
      <div className="col">
        <div id="score-x" className={`p-2 border-2 border-danger ${winner === 'X' ? 'border' : ''}`}>
          <div>Player <i className="fg-danger fa-solid fa-xmark"></i></div>
          <div className="fg fg-danger">{scores.X}</div>
        </div>
      </div>
      <div className="col">
        <div id="score-draw" className={`p-2 fg-warning border-2 border-warning ${draw ? 'border' : ''}`}>
          <div>Draws</div>
          <div className="fg fg-warning">{scores.draw}</div>
        </div>
      </div>
      <div  className="col">
        <div id="score-o" className={`p-2 border-2 border-info ${winner === 'O' ? 'border' : ''}`}>
          <div>Player <i id="turn-icon" className="fg-info fa-solid fa-o"></i></div>
          <div className="fg fg-info">{scores.O}</div>
        </div>
      </div>
    </div>
  )
}
