import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { applyLifecycle } from 'react-lifecycle-component'
import { withRouter } from 'react-router-dom'
import { Container } from './container'
import {
  postMagnitood,
  requestLogIn,
  requestLogOut,
  requestMagnitood,
  requestMagnitoodz,
  requestSignup,
  changeAuthenticationState
} from '../../action-creators'

const mapStateToProps = ({ magnitoodz, magnitood, authentication }) => ({
  magnitood,
  magnitoodz,
  authenticationState: authentication.authenticationState,
  userId: authentication.id
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      requestLogIn,
      requestLogOut,
      requestMagnitood,
      postMagnitood,
      requestSignup,
      changeAuthenticationState,
      componentDidMount: requestMagnitoodz
    },
    dispatch
  )
}

export const ComposedConnectedContainer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  applyLifecycle
)(Container)
