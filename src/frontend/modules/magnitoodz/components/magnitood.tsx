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
    spans = []
}) => {
    const chunkSize = bigMagnitude / maxChunks
    const currentColor = colors[spans.length]
    const nextColor = colors[spans.length + 1]
    const smallPercentOfBig = smallMagnitude / bigMagnitude
    const numChunks = smallPercentOfBig * maxChunks
    const hasFractionalPart = numChunks % 1 != 0
    const wholeNumChunks = hasFractionalPart ? Math.ceil(numChunks) : numChunks
    if (smallMagnitude >= chunkSize) {
        return [
            ...spans,
            <div>
                <p>
                    {smallMagnitudeName && <span>{smallMagnitudeName} </span>}
                    <span>{smallMagnitude} </span>
                    {unit && <span>{unit}</span>}
                </p>
                <MagnitoodSpan
                    index={spans.length}
                    chunks={wholeNumChunks}
                    last={hasFractionalPart ? FinalChunk.dim : FinalChunk.normal}
                    color={currentColor}
                />
            </div>
        ]
    } else {
        const soFar = [
            ...spans,
            <Comparison
                index={spans.length}
                bigChunkSize={chunkSize}
                smallChunkSize={wholeNumChunks}
                unit={unit}
                chunks={maxChunks}
                comparisonColor="white"
                bigMagnituteColor={currentColor}
                smallMagnitudeColor={nextColor}
            />
        ]
        return renderSmallMagnitude({
            bigMagnitude: chunkSize,
            smallMagnitude,
            smallMagnitudeName,
            maxChunks,
            unit,
            spans: soFar
        })
    }
}

const getStartingSmallComparisonChunkSize = ({ smallMagnitude, bigMagnitude, bigMagnitudeChunkSize, maxChunks }) => {
    return smallMagnitude <= bigMagnitudeChunkSize ? (bigMagnitude / maxChunks) : bigMagnitude
}

interface IProps {
    id: number,
    magnitood: IComparison,
    onInit: Function
}

/*
Unfortunately for those of us who prefer functional components,
this one needs to be a class, because it has to access its props
in componentDidMount. 

We can use recompose to add a componentDidMount method to a functional
component, but it won't have acces to props. :-(

TODO: figure out if there's a better way!
*/
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
                unit, description
            } = this.props.magnitood
            const maxChunks = 100
            const bigMagnitude = Math.max(span_1_magnitude, span_2_magnitude)
            const smallMagnitude = Math.min(span_1_magnitude, span_2_magnitude)
            const smallMagnitudeName = smallMagnitude === span_1_magnitude ? span_1_name : span_2_name
            const bigMagnitudeChunkSize = bigMagnitude / maxChunks
            const startingSmallComparisonChunkSize = getStartingSmallComparisonChunkSize({ smallMagnitude, bigMagnitude, bigMagnitudeChunkSize, maxChunks })
            return (
                <div className='white'>
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                    <p>
                        {span_1_name && <span>{span_1_name} </span>}
                        <span>{span_1_magnitude} </span>
                        {unit && <span>{unit}</span>}
                    </p>
                    <MagnitoodSpan
                        chunks={maxChunks}
                        color={colors[0]}
                        highlightColor={colors[1]}
                    />
                    {renderSmallMagnitude({
                        bigMagnitude: startingSmallComparisonChunkSize,
                        smallMagnitude,
                        smallMagnitudeName,
                        maxChunks,
                        unit
                    })}
                    <div className="mt5"><Link to="/">home</Link></div>
                </div>
            )

        } else {
            return <div>loading...</div>
        }
    }
}

export const MagnitoodWithRouter = withRouter(Magnitood)



