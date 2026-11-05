import { capitalize } from '../utils/format'

type FilterButtonsProps = {
  label: string // rubriken, t.ex. "Status" eller "Aktivitet"
  options: string[] // knapparna som ska visas
  selected: string // vilken som är vald just nu ('' = Alla)
  onChange: (value: string) => void // funktion att anropa vid klick
}

const FilterButtons = ({ label, options, selected, onChange }: FilterButtonsProps) => {
  return (
    // role="group" berättar för skärmläsare att knapparna hör ihop
    <div role="group" aria-label={label}>
      <p>{label}</p>

      <button
        type="button"
        aria-pressed={selected === ''}
        onClick={() => onChange('')}
      >
        Alla
      </button>

      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected === option}
          onClick={() => onChange(option)}
        >
          {capitalize(option)}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons