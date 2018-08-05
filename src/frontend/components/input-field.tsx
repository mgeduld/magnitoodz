import * as React from 'react'
import { inputStyle } from '../styles/constants'

interface IProps {
  label: string
  isPassword?: boolean
  placeholder: string
  updateFunction: Function
}

export const InputField: React.SFC<IProps> = ({
  isPassword,
  label,
  placeholder,
  updateFunction
}) => (
  <div>
    <label>
      {label}{' '}
      <input
        className={inputStyle}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        onChange={(e) => updateFunction(e.currentTarget.value)}
      />
    </label>
  </div>
)
