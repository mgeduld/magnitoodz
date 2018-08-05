import * as React from 'react'
import { IComparison } from '../../../../../shared/interfaces/comparison'
import { colors } from '../../colors'
import { MagnificationKey } from '../magnification-key'
import { getMagnitudesAndNames } from '../../utils/spans'
import { BigMagnitudeSpan } from '../big-magnitude-span'
import { renderSmallMagnitude } from '../../utils/render'
import { maxChunks } from '../../../../components/ui'

interface IProps {
  id: number
  magnitood: IComparison
  onInit: Function
}

export class Magnitood extends React.Component<IProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onInit(this.props.id)
  }

  render() {
    if (this.props.magnitood.span_1_magnitude) {
      const {
        title,
        span_1_name,
        span_2_name,
        span_1_magnitude,
        span_2_magnitude,
        unit,
        description,
        user_name
      } = this.props.magnitood
      const {
        bigMagnitude,
        smallMagnitude,
        bigMagnitudeName,
        smallMagnitudeName
      } = getMagnitudesAndNames(
        span_1_magnitude,
        span_2_magnitude,
        span_1_name,
        span_2_name
      )

      return (
        <div className="w-100">
          {title && <h2>{title}</h2>}
          <p>author: {user_name}</p>
          {description && <p>{description}</p>}
          <div className="ml3 mt4 mb0">
            <BigMagnitudeSpan
              colors={colors}
              bigMagnitude={bigMagnitude}
              bigMagnitudeName={bigMagnitudeName}
              maxChunks={maxChunks}
              unit={unit}
            />
            {smallMagnitude <= bigMagnitude / maxChunks && (
              <div className="mt0 ml4">
                <MagnificationKey
                  bigMagnitude={bigMagnitude}
                  maxChunks={maxChunks}
                  unit={unit}
                />
              </div>
            )}
            {bigMagnitude &&
              renderSmallMagnitude({
                bigMagnitude,
                smallMagnitude,
                smallMagnitudeName,
                maxChunks,
                unit
              })}
          </div>
        </div>
      )
    }
    return <div>loading...</div>
  }
}
