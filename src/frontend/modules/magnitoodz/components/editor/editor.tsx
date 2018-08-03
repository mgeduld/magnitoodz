import * as React from 'react'
import { alert, inputStyle } from '../../../../styles/constants'

interface IProps {
    onSubmitMagnitood: Function
    title: string,
    description: string,
    span1Name: string,
    span2Name: string,
    span1Magnitude: number,
    span2Magnitude: number,
    unit: string,
    errors: string[],
    updateTitle: Function
    updateDescription: Function
    updateSpan1Name: Function
    updateSpan1Magnitude: Function
    updateSpan2Name: Function
    updateSpan2Magnitude: Function
    updateUnit: Function,
    updateErrors: Function,
    history: any
}

const validate = ({ title, description, span1Name, span2Name, span1Magnitude, span2Magnitude, unit }) => {
    const span1MagnitudeIsOk = !isNaN(span1Magnitude) && Number(span1Magnitude) > 0 && Number(span1Magnitude) <= 14000000000
    const span2MagnitudeIsOk = !isNaN(span2Magnitude) && Number(span2Magnitude) > 0 && Number(span2Magnitude) <= 14000000000
    const span1NameIsOk = span1Name
    const hasSpan2NameIsOk = span2Name
    const errors = []
    if (!span1MagnitudeIsOk) {
        errors.push('Span 1 Magnitude must be a number between 1 and 14,000,000,000.')
    }
    if (!span2MagnitudeIsOk) {
        errors.push('Span 2 Magnitude must be a number between 1 and 14,000,000,000.')
    }
    if (!span1NameIsOk) {
        errors.push('Span 1 Name is required.')
    }
    if (!hasSpan2NameIsOk) {
        errors.push('Span 2 Namne is required.')
    }

    return errors
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
    history
}) => {
    const getData = () => {
        const data: any = {
            // TODO: remove hard-coding and use actual user id
            user_id: 1,
            span_1_name: span1Name,
            span_2_name: span2Name,
            span_1_magnitude: Number(span1Magnitude),
            span_2_magnitude: Number(span2Magnitude)
        }
        if (title) {
            data.title = title
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
                {
                    errors.length
                        ? <div className={alert}>{errors.join(' ')}</div>
                        : ''
                }
                <div className="mb2">
                    <label>Title{' '}
                        <input
                            onChange={(e) => updateTitle(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="title"
                            placeholder="Sequoias vs Humans" />
                    </label>
                </div>
                <div className="mb2">
                    <label>Description{' '}
                        <input
                            onChange={(e) => updateDescription(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="description"
                            placeholder="Sequoias live a long time compared to humans." />
                    </label>
                </div>
                <div className="mb2">
                    <label>Span 1 Name*{' '}
                        <input
                            onChange={(e) => updateSpan1Name(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="span_1_name"
                            placeholder="Sequoias" />
                    </label>
                </div>
                <div className="mb2">
                    <label>Span 1 Magnitude*{' '}
                        <input
                            onChange={(e) => updateSpan1Magnitude(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="span_1_magnitude"
                            placeholder="3000" />
                    </label>
                </div>
                <div className="mb2">
                    <label>Span 2 Name*{' '}
                        <input
                            onChange={(e) => updateSpan2Name(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="span_2_name"
                            placeholder="Humans" />
                    </label>
                </div>
                <div className="mb2">
                    <label>Span 2 Magnitude*{' '}
                        <input
                            onChange={(e) => updateSpan2Magnitude(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="span_2_magnitude"
                            placeholder="80" />
                    </label>
                </div>
                <div className="mb2">
                    <label>Units{' '}
                        <input
                            onChange={(e) => updateUnit(e.currentTarget.value)}
                            className={inputStyle}
                            type="text"
                            name="unit"
                            placeholder="years" />
                    </label>
                </div>
                <p className="mb2 mt4">* required fields</p>
                <div className="mb2 mt4"><a
                    href=""
                    onClick={(e) => {
                        e.preventDefault()
                        const errors = validate({
                            title,
                            description,
                            span1Name,
                            span2Name,
                            span1Magnitude,
                            span2Magnitude,
                            unit
                        })
                        if (errors.length) {
                            updateErrors(errors)
                        }
                        else {
                            updateErrors([])
                            const data = getData()
                            onSubmitMagnitood(data)
                            history.push('/')
                        }
                    }}>Submit</a>
                </div>
            </form>
        </div>
    )
}