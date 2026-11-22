export function Cell({ value, onClick, disabled }) {
  return (
    <div className="card">
      <button
        type="button"
        className="btn ratio ratio-1x1"
        onClick={onClick}
        disabled={disabled}
      >
        {value === 'X' ? <i className="fg-danger fa-solid fa-xmark"></i> : null}
        {value === 'O' ? <i className="fg-info fa-solid fa-o"></i> : null}
      </button>
    </div>
  )
}
