import * as React from 'react'
import { alert, inputStyle } from '../../../../styles/constants'
import { getValidationTests } from './validationTests'
import { runValidationTests } from '../../../../utils/validation'
import {
  isValidString,
  isValidMagnitude
} from '../../../../../shared/utils/validation'
import { InputField } from '../../../../components/input-field'
import { IComparison } from '../../../../../shared/interfaces/comparison'

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
  magnitood?: IComparison
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
  userId,
  magnitood = {}
}) => {
  // unfortunately, we can't automatically trigger the update functions,
  // and if the user is updating an onld Magnitude, he may not
  // update all fields. So we'll have to populate this object
  // with refs
  const dataCollectorForUpdates = {
    title,
    description,
    span1Name,
    span1Magnitude,
    span2Name,
    span2Magnitude,
    unit
  }
  const getData = () => {
    const data: any = {
      user_id: localStorage.user_id,
      title: magnitood ? dataCollectorForUpdates.title['value'] : title,
      span_1_name: magnitood
        ? dataCollectorForUpdates.span1Name['value']
        : span1Name,
      span_2_name: magnitood
        ? dataCollectorForUpdates.span2Name['value']
        : span2Name,
      span_1_magnitude: magnitood
        ? Number(dataCollectorForUpdates.span1Magnitude['value'])
        : Number(span1Magnitude),
      span_2_magnitude: magnitood
        ? Number(dataCollectorForUpdates.span2Magnitude['value'])
        : Number(span2Magnitude)
    }
    if (description || dataCollectorForUpdates.description['value']) {
      data.description = magnitood
        ? dataCollectorForUpdates.description['value']
        : description
    }
    if (unit || dataCollectorForUpdates.unit['value']) {
      data.unit = magnitood ? dataCollectorForUpdates.unit['value'] : unit
    }
    if (magnitood) {
      data.id = magnitood.id
    }
    return data
  }
  return (
    <div className="ml4">
      <h2>{magnitood ? 'Edit' : 'New'} Magnitood</h2>
      <form className="ml4">
        {errors.length ? <div className={alert}>{errors.join(' ')}</div> : ''}
        <div className="mb2">
          <InputField
            label="Title*"
            placeholder="Sequoias vs Humans"
            updateFunction={updateTitle}
            value={magnitood.title}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'title'}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Description"
            placeholder="Sequoias live a long time compared to humans."
            updateFunction={updateDescription}
            value={magnitood.description}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'description'}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 1 Name*"
            placeholder="Sequoias"
            updateFunction={updateSpan1Name}
            value={magnitood.span_1_name}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'span1Name'}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 1 Magnitude*"
            placeholder="3000"
            updateFunction={updateSpan1Magnitude}
            value={magnitood.span_1_magnitude}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'span1Magnitude'}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 2 Name*"
            placeholder="Humans"
            updateFunction={updateSpan2Name}
            value={magnitood.span_2_name}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'span2Name'}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Span 2 Magnitude*"
            placeholder="80"
            updateFunction={updateSpan2Magnitude}
            value={magnitood.span_2_magnitude}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'span2Magnitude'}
          />
        </div>
        <div className="mb2">
          <InputField
            label="Units"
            placeholder="years"
            updateFunction={updateUnit}
            value={magnitood.unit}
            dataCollector={dataCollectorForUpdates}
            dataCollectorField={'unit'}
          />
        </div>
        <p className="mb2 mt4">* required fields</p>
        <div className="mb2 mt4">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              /* tslint:disable ter-indent */
              const errors = magnitood
                ? validate({
                    title: dataCollectorForUpdates.title['value'],
                    span1Name: dataCollectorForUpdates.span1Name['value'],
                    span2Name: dataCollectorForUpdates.span2Name['value'],
                    span1Magnitude:
                      dataCollectorForUpdates.span1Magnitude['value'],
                    span2Magnitude:
                      dataCollectorForUpdates.span2Magnitude['value']
                  })
                : validate({
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
                onSubmitMagnitood(data, !!magnitood)
                history.push(magnitood.id ? `/magnitood/${magnitood.id}` : '/')
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
