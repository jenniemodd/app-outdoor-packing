import { STATUSES } from '../config'
import styles from './StatusPicker.module.css'

type StatusPickerProps = {
  itemId: string
  itemTitle: string
  status: string
  onChange: (status: string) => void
}

const StatusPicker = ({ itemId, itemTitle, status, onChange }: StatusPickerProps) => {
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>Status för {itemTitle}</legend>

      <div className={styles.options}>
        {STATUSES.map((s) => (
          <label key={s} className={styles.option} data-status={s}>
            <input
              type="radio"
              className={styles.input}
              name={`status-${itemId}`}
              value={s}
              checked={status === s}
              onChange={() => onChange(s)}
            />
            {s}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default StatusPicker