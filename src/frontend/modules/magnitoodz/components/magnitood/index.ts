import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Magnitood } from './magnitood'

export const ComposedMagnitood: any = compose(withRouter)(Magnitood)
