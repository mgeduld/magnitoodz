import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Magnitood } from './magnitood'

export const ComposedMagnitood: any = compose(
  withRouter,
  lifecycle({
    componentWillReceiveProps({ onInit, id }) {
      onInit(id)
    }
  })
)(Magnitood)
