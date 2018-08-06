import * as React from 'react'
import { alert, inputStyle } from '../../../../styles/constants'
import { getValidationTests } from './validationTests'
import { runValidationTests } from '../../../../utils/validation'
import {
  isValidString,
  isValidMagnitude
} from '../../../../../shared/utils/validation'
import { InputField } from '../../../../components/input-field'

interface IProps {
  onSubmitMagnitood: Function
  title: string
  description: string
  span1Name: string
  span2Name: string
  span1Magnitude: number
  span2Magnitude: number
  unit: string
  errors: string[]
  updateTitle: Function
  updateDescription: Function
  updateSpan1Name: Function
  updateSpan1Magnitude: Function
  updateSpan2Name: Function
  updateSpan2Magnitude: Function
  updateUnit: Function
  updateErrors: Function
  history: any
  userId: number
}

const validate = ({
  title,
  span1Name,
  span2Name,
  span1Magnitude,
  span2Magnitude
}) => {
  const validationTests = getValidationTests(
    {
      title,
      span_1_magnitude: span1Magnitude,
      span_2_magnitude: span2Magnitude,
      span_1_name: span1Name,
      span_2_name: span2Name
    },
    {
      isValidString,
      isValidMagnitude
    }
  )
  return runValidationTests(validationTests)
}

export const Editor: React.SFC<IProps> = ({
  onSubmitMagnitood,
  title,
  description,
  span1Name,
  span2Name,
  span1Magnitude,
  span2Magnitude,
  unit,
  errors,
  updateTitle,
  updateDescription,
  updateSpan1Name,
  updateSpan1Magnitude,
  updateSpan2Name,
  updateSpan2Magnitude,
  updateUnit,
  updateErrors,
  history,
  userId
}) => {
  const getData = () => {
    const data: any = {
      title,
      user_id: userId,
      span_1_name: span1Name,
      span_2_name: span2Name,
      span_1_magnitude: Number(span1Magnitude),
      span_2_magnitude: Number(span2Magnitude)
    }
    if (description) {
      data.description = description
    }
    if (unit) {
      data.unit = unit
    }
    return data
  }
  return (
    <div className="ml4">
      <h2>New Magnitood</h2>
      <form className="ml4">
        {errors.length ? <div className={alert}>{errors.join(' ')}</div> : ''}
        <div className="mb2">
          <InputField
            label="Title*"
            placeholder="Sequoias vs Humans"
            updateFunction={updateTitle}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Description"
            placeholder="Sequoias live a long time compared to humans."
            updateFunction={updateDescription}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 1 Name*"
            placeholder="Sequoias"
            updateFunction={updateSpan1Name}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 1 Magnitude*"
            placeholder="3000"
            updateFunction={updateSpan1Magnitude}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 2 Name*"
            placeholder="Humans"
            updateFunction={updateSpan2Name}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 2 Magnitude*"
            placeholder="80"
            updateFunction={updateSpan2Magnitude}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Units"
            placeholder="years"
            updateFunction={updateUnit}
          />
        </div>
        <p className="mb2 mt4">* required fields</p>
        <div className="mb2 mt4">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              const errors = validate({
                title,
                span1Name,
                span2Name,
                span1Magnitude,
                span2Magnitude
              })
              if (errors.length) {
                updateErrors(errors)
              } else {
                updateErrors([])
                const data = getData()
                onSubmitMagnitood(data)
                history.push('/')
              }
            }}
          >
            Submit
          </a>
        </div>
      </form>
    </div>
  )
}
