import * as React from 'react'
import { FinalChunk } from '../enums/chunk'
import { Runes } from '../enums/runes'
import { getChunks } from '../utils/spans'

interface IProps {
  chunks: number
  last?: FinalChunk
  color?: string
  dimColor?: string
  highlightColor?: string
  index?: number
}

const makeSpanElements = ({
  chunks,
  last,
  color,
  highlightColor,
  dimColor,
  index = 0
}) => {
  let finalColor = color
  if (last === FinalChunk.dim) {
    finalColor = dimColor
  } else if (last === FinalChunk.highlight) {
    finalColor = highlightColor
  }

  return (
    <span key={index}>
      <span className={color}>
        {Runes.head}
        {getChunks(chunks - 1)}
      </span>
      <span className={finalColor}>{Runes.chunk}</span>
      <span className={color}>{Runes.tail}</span>
    </span>
  )
}

export const MagnitoodSpan: React.SFC<IProps> = ({
  chunks,
  last = FinalChunk,
  color = 'black',
  dimColor = 'gray',
  highlightColor = 'red'
}) => {
  return (
    <div>
      {makeSpanElements({ chunks, last, color, highlightColor, dimColor })}
    </div>
  )
}
