import * as React from 'react'
import { range } from 'lodash'
import { Runes } from '../enums/runes'
import 'tachyons/css/tachyons.css'

interface IProps {
    chunks: number,
    bigChunkSize: number,
    smallChunkSize: number,
    unit?: string,
    comparisonColor?: string
    bigMagnituteColor?: string
    smallMagnitudeColor?: string
    index?: number
}

export const Comparison: React.SFC<IProps> = ({
    chunks,
    bigChunkSize,
    smallChunkSize,
    unit = '',
    comparisonColor = 'white',
    bigMagnituteColor = 'red',
    smallMagnitudeColor = 'green',
    index = 0
}) => {
    return (
        <div className="ma4" key={index}>
            <div>
                <span className={comparisonColor}>One dash (</span>
                <span className={bigMagnituteColor}>{Runes.chunk}</span>
                <span className={comparisonColor}>) above equals {bigChunkSize} {unit && `${unit} `}or </span>
            </div>
            <div>
                <span className={bigMagnituteColor}>{Runes.chunk}</span>
                <span className={comparisonColor}> = </span>
                <span className={smallMagnitudeColor}>{range(chunks).map(chunk => Runes.chunk)}</span>
            </div>
        </div>
    )
}