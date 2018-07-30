import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { applyLifecycle } from 'react-lifecycle-component'
import { withRouter } from 'react-router-dom'
import { Container } from './container'
import { fetchMagnitoodz } from './action-creators'

const mapStateToProps = state => ({
    magnitoodz: state.magnitoodz
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        componentDidMount: fetchMagnitoodz
    }, dispatch)
}

export const ComposedConnectedContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    applyLifecycle
)(Container)

