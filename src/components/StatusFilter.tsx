type StatusFilterProps = {
  statuses: string[] // knapparna som ska visas
  selected: string // vilken som är vald just nu ('' = Alla)
  onChange: (status: string) => void // funktion att anropa vid klick
}

const StatusFilter = ({ statuses, selected, onChange }: StatusFilterProps) => {
  return (
    <div>
      <button
        type="button"
        aria-pressed={selected === ''}
        onClick={() => onChange('')}
      >
        Alla
      </button>

      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          aria-pressed={selected === status}
          onClick={() => onChange(status)}
        >
          {status}
        </button>
      ))}
    </div>
  )
}

export default StatusFilter