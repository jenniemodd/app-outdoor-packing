import { STATUSES } from '../config'

type StatusPickerProps = {
  itemId: string // behövs för att varje rad ska få en egen grupp
  itemTitle: string // för skärmläsare: "Status för Pannlampa"
  status: string // vald status just nu
  onChange: (status: string) => void
}

const StatusPicker = ({ itemId, itemTitle, status, onChange }: StatusPickerProps) => {
  return (
    // fieldset + legend talar om att knapparna hör ihop och vad de gäller
    <fieldset>
      <legend>Status för {itemTitle}</legend>

      {STATUSES.map((s) => (
        <label key={s}>
          <input
            type="radio"
            name={`status-${itemId}`} // samma name = samma grupp, bara en kan vara vald
            value={s}
            checked={status === s}
            onChange={() => onChange(s)}
          />
          {s}
        </label>
      ))}
    </fieldset>
  )
}

export default StatusPicker