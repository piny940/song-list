import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ja } from 'date-fns/locale/ja'

registerLocale('ja', ja)

export type DateFieldProps = {
  value: Date | null
  setValue: (date: Date | null) => void
  maxDate?: Date
}

export const DateField: React.FC<DateFieldProps> = ({
  value,
  setValue,
  maxDate,
}) => {
  return (
    <ReactDatePicker
      locale="ja"
      selected={value}
      onChange={date => setValue(date)}
      className="form-control"
      dateFormat="yyyy/MM/dd"
      maxDate={maxDate}
      placeholderText=" 年/月/日"
    />
  )
}
