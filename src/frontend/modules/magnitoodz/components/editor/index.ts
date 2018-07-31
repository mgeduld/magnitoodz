import { compose, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Editor } from './editor'

export const ComposedEditor: any = compose(
    withRouter,
    withState('title', 'updateTitle', undefined),
    withState('description', 'updateDescription', undefined),
    withState('span1Name', 'updateSpan1Name', undefined),
    withState('span1Magnitude', 'updateSpan1Magnitude', undefined),
    withState('span2Name', 'updateSpan2Name', undefined),
    withState('span2Magnitude', 'updateSpan2Magnitude', undefined),
    withState('unit', 'updateUnit', undefined),
    withState('errors', 'updateErrors', [])
)(Editor)