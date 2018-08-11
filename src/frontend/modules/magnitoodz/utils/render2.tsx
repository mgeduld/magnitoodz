import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TimelineLite } from 'gsap'
import { SpanGroup } from './spans2'
import { colors } from '../../../constants/colors'
import { getMagnitudes } from './calculations'

const spaceBeteenSequences = 64

interface IComparisonSequence {
  tl: any
}

interface IComparisonSequenceProps {
  color: string
  magnificationColor: string
  magnitudeName: string
  magnitude: number
  unit?: string
  spanLength: number
  onComplete: Function
  play?: boolean
  first: boolean
  shouldMagnify?: boolean
}

class ComparisonSequence extends React.Component<IComparisonSequenceProps>
  implements IComparisonSequence {
  tl = new TimelineLite({
    onComplete: () => this.props.onComplete()
  })

  play() {
    this.props.play ? this.tl.play() : this.tl.pause()
  }

  componentDidUpdate() {
    this.play()
  }

  componentDidMount() {
    const container = ReactDOM.findDOMNode(this)
    const bigSpan = (container as Element).querySelector('.bigSpan')
    const spanChunk = (container as Element).querySelector('.spanChunk')
    const newSpanChunk = (container as Element).querySelector('.newSpanChunk')
    const dashKey = (container as Element).querySelector('.dashKey')
    const newDashKey = (container as Element).querySelector('.newDashKey')
    const magnificationKey = (container as Element).querySelector(
      '.magnificationKey'
    )
    const magnitudeTitle = (container as Element).querySelector(
      '.magnitudeTitle'
    )
    const { first, shouldMagnify } = this.props
    this.tl.fromTo(
      bigSpan,
      2,
      { opacity: 0, width: '1%' },
      { opacity: 1, width: '100%' },
      'fullSpan'
    )
    if (first) {
      this.tl.fromTo(
        magnitudeTitle,
        2,
        { opacity: 0 },
        { opacity: 1 },
        'fullSpan'
      )
    }
    if (!first) {
      this.tl.fromTo(
        newDashKey,
        2,
        { opacity: 0, top: '-20px', left: '100px' },
        { opacity: 1 },
        'fullSpan'
      )
    }
    if (shouldMagnify) {
      this.tl
        .fromTo(spanChunk, 1, { opacity: 0 }, { opacity: 1 }, 'spanChunks')
        .fromTo(newSpanChunk, 1, { opacity: 0 }, { opacity: 1 }, 'spanChunks')
        .fromTo(
          newSpanChunk,
          2,
          { top: '0px' },
          { top: `${spaceBeteenSequences}px` }
        )
        .fromTo(
          dashKey,
          2,
          { opacity: 0, top: `${spaceBeteenSequences}px`, left: '15px' },
          { opacity: 1 }
        )
        .to(dashKey, 0.5, { opacity: 0 })
        .fromTo(
          magnificationKey,
          2,
          { top: `${spaceBeteenSequences}px`, left: '15px', opacity: 0 },
          { opacity: 1 }
        )
        .to(magnificationKey, 0.5, { opacity: 0 })
    }
    this.play()
  }

  render() {
    const {
      color,
      magnificationColor,
      magnitudeName,
      magnitude,
      unit = '',
      spanLength,
      first,
      shouldMagnify = true
    } = this.props
    return (
      <div>
        <SpanGroup
          color={color}
          magnificationColor={magnificationColor}
          magnitudeName={magnitudeName}
          magnitude={magnitude}
          unit={unit}
          spanLength={spanLength}
          first={first}
          shouldMagnify={shouldMagnify}
        />
      </div>
    )
  }
}

interface IComparisonAnimationProps {
  bigMagnitude: number
  smallMagnitude: number
  bigMagnitudeName: string
  smallMagnitudeName: string
  unit?: string
  spanLength: number
}

interface IComparisonAnimationState {
  currentSequence: number
}

export class ComparisonAnimation extends React.Component<
  IComparisonAnimationProps,
  IComparisonAnimationState
> {
  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.makeSequences = this.makeSequences.bind(this)
    this.state = {
      currentSequence: 0
    }
  }

  next() {
    this.setState({ currentSequence: this.state.currentSequence + 1 })
  }

  makeSequences({
    magnitudes,
    bigMagnitudeName,
    smallMagnitude,
    smallMagnitudeName,
    spanLength,
    unit
  }) {
    const sequences = magnitudes.map((magnitude, index) => {
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '100%',
            top: `${index * spaceBeteenSequences}px`
          }}
        >
          <ComparisonSequence
            onComplete={this.next}
            play={this.state.currentSequence === index}
            color={colors[index]}
            magnificationColor={colors[index + 1]}
            unit={unit}
            magnitudeName={bigMagnitudeName}
            magnitude={magnitude}
            spanLength={spanLength}
            first={index === 0}
            shouldMagnify={index < magnitudes.length - 1}
          />
        </div>
      )
    })
    const finalSequenceColor =
      magnitudes.length === 1 ? colors[0] : colors[magnitudes.length - 1]
    const finalSequenceIndex = magnitudes.length
    const finalMagnitudeChunkSize =
      magnitudes[finalSequenceIndex - 1] / spanLength
    const finalNumChunks = smallMagnitude / finalMagnitudeChunkSize
    const finalSequence = (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          top: `${finalSequenceIndex * spaceBeteenSequences}px`
        }}
        key={finalSequenceIndex}
      >
        <ComparisonSequence
          onComplete={this.next}
          play={this.state.currentSequence === magnitudes.length}
          color={finalSequenceColor}
          magnificationColor={finalSequenceColor}
          unit={unit}
          magnitudeName={smallMagnitudeName}
          magnitude={smallMagnitude}
          spanLength={finalNumChunks}
          first={true}
          shouldMagnify={false}
        />
      </div>
    )
    sequences.push(finalSequence)
    return sequences
  }

  render() {
    const {
      bigMagnitude,
      smallMagnitude,
      bigMagnitudeName,
      smallMagnitudeName,
      unit,
      spanLength
    } = this.props
    const magnitudes = getMagnitudes(bigMagnitude, smallMagnitude, spanLength)
    return (
      <div style={{ position: 'relative' }}>
        {this.makeSequences({
          magnitudes,
          smallMagnitude,
          bigMagnitudeName,
          smallMagnitudeName,
          spanLength,
          unit
        })}
      </div>
    )
  }
}
