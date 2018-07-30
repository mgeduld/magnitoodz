import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { IComparison } from '../../../../shared/interfaces/comparison';

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
        return (
            <div>Magnitood: {this.props.id} {this.props.magnitood ? this.props.magnitood.title : ''}<Link to="/">home</Link></div>
        )
    }
}

export const MagnitoodWithRouter = withRouter(Magnitood)



