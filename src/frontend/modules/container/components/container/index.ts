import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { applyLifecycle } from 'react-lifecycle-component'
import { withRouter } from 'react-router-dom'
import { Container } from './container'
import { postMagnitood, requestMagnitood, requestMagnitoodz } from '../../action-creators'

const mapStateToProps = state => ({
    magnitood: state.magnitood,
    magnitoodz: state.magnitoodz
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        componentDidMount: requestMagnitoodz,
        requestMagnitood,
        postMagnitood
    }, dispatch)
}

export const ComposedConnectedContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    applyLifecycle
)(Container)

