import * as React from 'react'
import { connect, Provider } from 'react-redux'
import { store } from './store'

interface ISets {
    set1: number[];
    set2: number[];
    addItem: (item: number) => { type: string, value: number };
    triggerSaga: () => { type: string }
}

const StorePrinter: React.SFC<ISets> = ({ set1, set2, addItem, triggerSaga }) => {
    return (
        <div>
            <p onClick={() => addItem(11)}>{set1.join(' ')}</p>
            <p onClick={() => triggerSaga()}>{set2.join(' ')}</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        set1: state.reducer1,
        set2: state.reducer2
    }
}

const addItem = (item: number) => ({
    type: 'addItem',
    value: item
})

const triggerSaga = () => ({
    type: 'addFive'
})

const mapDispatchToProps = dispatch => {
    return {
        addItem: (item: number) => {
            dispatch(addItem(item))
        },
        triggerSaga: () => dispatch(triggerSaga())
    }
}

const ConnectedStorePrinter = connect(
    mapStateToProps,
    mapDispatchToProps
)(StorePrinter)

export const App: React.SFC<null> = () => {
    return (
        <Provider store={store} >
            <ConnectedStorePrinter />
        </Provider>
    )
} 
