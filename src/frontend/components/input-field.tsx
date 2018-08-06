import * as React from 'react'
import { inputStyle } from '../styles/constants'

interface IProps {
  label: string
  isPassword?: boolean
  placeholder: string
  updateFunction: Function
  value?: any
  dataCollector?: object
  dataCollectorField?: string
}

/* tslint:disable ter-indent */
export const InputField: React.SFC<IProps> = ({
  isPassword,
  label,
  placeholder,
  updateFunction,
  value,
  dataCollector,
  dataCollectorField
}) => (
  <div>
    <label>
      {label}{' '}
      <input
        className={inputStyle}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        defaultValue={value || undefined}
        ref={(el) => {
          if (dataCollector && dataCollectorField) {
            dataCollector[dataCollectorField] = el
          }
        }}
        onChange={
          dataCollector
            ? undefined
            : (e) => {
                updateFunction(e.currentTarget.value)
              }
        }
      />
    </label>
  </div>
)
