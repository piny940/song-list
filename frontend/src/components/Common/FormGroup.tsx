import { HTMLInputTypeAttribute } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export type FormGroupProps = {
  label: string
  register: UseFormRegister<FieldValues>
  type: HTMLInputTypeAttribute
  name: string
  required?: boolean
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  register,
  type,
  name,
  required,
}) => {
  return (
    <div className="row my-3">
      <div className="col-md-3 fw-bold col-form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </div>
      <div className="col-md-9">
        <input
          type={type}
          {...register(name, {
            required: required && 'このフィールドは必須です。',
          })}
          className="form-control"
        />
      </div>
    </div>
  )
}
