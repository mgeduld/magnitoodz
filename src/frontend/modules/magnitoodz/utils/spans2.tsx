import * as React from 'react'
import { range } from 'lodash'
import { isWholeNumber } from './calculations'

interface IChunkProp {
  color: string
  whole?: boolean
}

const Chunk: React.SFC<IChunkProp> = ({ color = 'white', whole = true }) => {
  const style = whole
    ? {}
    : { background: 'trasparent', height: '5px', opacity: 0.5 }
  return <span className={`mr1 bg-${color} chunk`} style={style} />
}

interface ISpanProps {
  length: number
  color: string
}

export const Span: React.SFC<ISpanProps> = ({ length, color }) => {
  const roundedLength = Math.ceil(length)
  const chunks = range(roundedLength - 1).map((key) => (
    <Chunk key={key} color={color} />
  ))
  const finalChunk = (
    <Chunk key={roundedLength} color={color} whole={isWholeNumber(length)} />
  )
  chunks.push(finalChunk)
  return <div>{chunks}</div>
}

interface ISpanGroupProps {
  color: string
  magnificationColor: string
  magnitude: number
  magnitudeName: string
  unit: string
  spanLength: number
  first: boolean
  shouldMagnify?: boolean
}

export const SpanGroup: React.SFC<ISpanGroupProps> = ({
  color,
  magnificationColor,
  magnitude,
  magnitudeName,
  spanLength,
  first,
  unit = '',
  shouldMagnify = true
}) => {
  const chunkMagnitude = (magnitude / spanLength).toLocaleString()
  return (
    <div>
      <div
        style={{ position: 'relative', marginBottom: '10px', height: '10px' }}
      >
        {first && (
          <div style={{ position: 'absolute' }} className="magnitudeTitle">
            {magnitudeName} {magnitude.toLocaleString()} {unit} (each dash ={' '}
            {(magnitude / spanLength).toLocaleString()} {unit})
          </div>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        {!first && (
          <div style={{ position: 'absolute' }} className="newDashKey">
            Each dash = {(magnitude / spanLength).toLocaleString()} {unit}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '20px',
            overflowY: 'hidden'
          }}
          className="bigSpan"
        >
          <Span length={spanLength} color={color} />
        </div>
        {shouldMagnify && (
          <div>
            <div
              style={{ position: 'absolute', margin: 0, padding: 0 }}
              className="spanChunk"
            >
              <Chunk color={magnificationColor} />
            </div>
            <div
              style={{ position: 'absolute', margin: 0, padding: 0 }}
              className="newSpanChunk"
            >
              <Chunk color={magnificationColor} />
            </div>
            <span
              style={{ position: 'absolute', display: 'inline-block' }}
              className="dashKey"
            >
              {'\u21e0'} {chunkMagnitude} {unit}
            </span>
            <p
              style={{ position: 'absolute', margin: 0, padding: 0 }}
              className="magnificationKey"
            >
              Let's magnify x 100!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
