import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { IComparison } from '../../../../shared/interfaces/comparison'
import { MagnitoodSpan } from './magnitood-span'
import { Comparison } from './comparison'
import { FinalChunk } from '../enums/chunk'
import { colors } from '../colors'

const renderSmallMagnitude = ({
  bigMagnitude,
  smallMagnitude,
  smallMagnitudeName,
  maxChunks,
  unit,
  spans = [],
  key = 0
}) => {
  const chunkSize = bigMagnitude / maxChunks
  const currentColor = colors[spans.length]
  const nextColor = colors[spans.length + 1]
  const smallPercentOfBig = smallMagnitude / bigMagnitude
  const numChunks = smallPercentOfBig * maxChunks
  const hasFractionalPart = numChunks % 1 !== 0
  const wholeNumChunks = hasFractionalPart ? Math.ceil(numChunks) : numChunks
  if (smallMagnitude >= chunkSize) {
    return [
      ...spans,
      <div className="mt3 mb0 bg-near-black pa2" key={key}>
        <p className="b i">
          {smallMagnitudeName && <span>{smallMagnitudeName} </span>}
          <span>{smallMagnitude} </span>
          {unit && <span>{unit}</span>}
        </p>
        <MagnitoodSpan
          chunks={wholeNumChunks}
          last={hasFractionalPart ? FinalChunk.dim : FinalChunk.normal}
          color={currentColor}
        />
      </div>
    ]
  }
  const soFar = [
    ...spans,
    <Comparison
      key={key}
      bigChunkSize={chunkSize}
      smallChunkSize={wholeNumChunks}
      unit={unit}
      chunks={maxChunks}
      comparisonColor="white"
      bigMagnituteColor={currentColor}
      smallMagnitudeColor={nextColor}
      smallMagnitude={smallMagnitude}
      smallMagnitudeChunkSize={bigMagnitude / maxChunks / maxChunks}
    />
  ]
  return renderSmallMagnitude({
    smallMagnitude,
    smallMagnitudeName,
    maxChunks,
    unit,
    bigMagnitude: chunkSize,
    spans: soFar,
    key: key + 1
  })
}

interface IProps {
  id: number
  magnitood: IComparison
  onInit: Function
}

class Magnitood extends React.Component<IProps> {
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
      const maxChunks = 100
      const bigMagnitude = Math.max(span_1_magnitude, span_2_magnitude)
      const smallMagnitude = Math.min(span_1_magnitude, span_2_magnitude)
      const smallMagnitudeName =
        smallMagnitude === span_1_magnitude ? span_1_name : span_2_name
      return (
        <div className="w-100">
          {title && <h2>{title}</h2>}
          <p>author: {user_name}</p>
          {description && <p>{description}</p>}
          <div className="ml3 mt4">
            <div className="bg-near-black pa2">
              <p className="b i">
                {span_1_name && <span>{span_1_name} </span>}
                <span>{span_1_magnitude} </span>
                {unit && <span>{unit}</span>}
              </p>
              <MagnitoodSpan
                chunks={maxChunks}
                color={colors[0]}
                highlightColor={colors[1]}
              />
            </div>
            {smallMagnitude < bigMagnitude / maxChunks && (
              <p className="ml5 mb0">
                - equals {(bigMagnitude / maxChunks).toFixed(2)} {unit && unit}
                <br />
                <span className="mid-gray b">|</span>
                <br />
                <span className="mid-gray b">| magnified x 100</span>
                <br />
                <span className="mid-gray b">|</span>
              </p>
            )}
            {renderSmallMagnitude({
              smallMagnitude,
              smallMagnitudeName,
              maxChunks,
              unit,
              bigMagnitude
            })}
          </div>
        </div>
      )
    }
    return <div>loading...</div>
  }
}

export const MagnitoodWithRouter = withRouter(Magnitood)
