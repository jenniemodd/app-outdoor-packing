import { capitalize } from '../utils/format'
import styles from './FilterButtons.module.css'

type FilterButtonsProps = {
  label: string
  options: string[]
  selected: string
  onChange: (value: string) => void
}

const FilterButtons = ({ label, options, selected, onChange }: FilterButtonsProps) => {
  return (
    <div className={styles.group} role="group" aria-label={label}>
      <p className={styles.label}>{label}</p>

      <div className={styles.options}>
        <button
          type="button"
          className={styles.button}
          aria-pressed={selected === ''}
          onClick={() => onChange('')}
        >
          Alla
        </button>

        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.button}
            aria-pressed={selected === option}
            onClick={() => onChange(option)}
          >
            {capitalize(option)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterButtons