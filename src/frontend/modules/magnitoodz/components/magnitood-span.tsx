import * as React from 'react'
import { range } from 'lodash'
import { FinalChunk } from '../enums/chunk'
import { Runes } from '../enums/runes'

interface IProps {
    chunks: number
    last?: FinalChunk
    color?: string
    dimColor?: string
    highlightColor?: string
    index?: number
}

const makeSpanElements = ({ chunks, last, color, highlightColor, dimColor, index = 0 }) => {
    let finalColor = color
    if (last === FinalChunk.dim) {
        finalColor = dimColor
    } else if (last === FinalChunk.highlight) {
        finalColor = highlightColor
    }

    return (
        <span key={index}>
            <span className={color}>{Runes.head}{
                range(chunks - 1).map((chunk: number) => Runes.chunk)
            }</span>
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