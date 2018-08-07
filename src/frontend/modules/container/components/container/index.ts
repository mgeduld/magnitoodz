import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { applyLifecycle } from 'react-lifecycle-component'
import { withRouter } from 'react-router-dom'
import { Container } from './container'
import {
  postMagnitood,
  updateMagnitood,
  requestLogIn,
  requestLogOut,
  requestMagnitood,
  requestMagnitoodz,
  requestDelete,
  requestSignup,
  changeAuthenticationState
} from '../../action-creators'

const mapStateToProps = ({ magnitoodz, magnitood, authentication }) => ({
  magnitood: magnitood.magnitood,
  magnitoodLoadedState: magnitood.magnitoodLoadedState,
  magnitoodz: magnitoodz.magnitoodz,
  magnitoodzLoadedState: magnitoodz.magnitoodzLoadedState,
  magnitoodzCount: magnitoodz.count,
  authenticationState: authentication.authenticationState,
  userId: authentication.id,
  userName: authentication.userName
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      requestLogIn,
      requestLogOut,
      requestMagnitood,
      requestMagnitoodz,
      postMagnitood,
      updateMagnitood,
      requestDelete,
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
