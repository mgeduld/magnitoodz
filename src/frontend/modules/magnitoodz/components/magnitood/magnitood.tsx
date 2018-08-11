import * as React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown = require('react-markdown')
import { IComparison } from '../../../../../shared/interfaces/comparison'
import { getMagnitudesAndNames } from '../../utils/spans'
import { maxChunks } from '../../../../constants/ui'
import { MagnitoodLoadedState } from '../../../../enums/magnitood'
import { ComparisonAnimation } from '../../utils/render2'

interface IProps {
  id: number
  magnitood: IComparison
  onInit: Function
  requestDelete: Function
  userId: number
  loadedState: MagnitoodLoadedState
  history: any
}

interface IState {
  userChoseDelete: boolean
}

export class Magnitood extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { userChoseDelete: false }
  }

  componentDidMount() {
    this.props.onInit(this.props.id)
  }

  toggleDeleteState = (e) => {
    e.preventDefault()
    this.setState({ userChoseDelete: !this.state.userChoseDelete })
  }

  deleteMagnitood = () => (e) => {
    e.preventDefault()
    this.props.requestDelete(this.props.id, localStorage.userId)
    this.props.history.push('/')
  }

  render() {
    if (this.props.loadedState === MagnitoodLoadedState.loaded) {
      const {
        title,
        span_1_name,
        span_2_name,
        span_1_magnitude,
        span_2_magnitude,
        unit,
        description,
        user_id,
        user_name
      } = this.props.magnitood
      const {
        bigMagnitude,
        smallMagnitude,
        bigMagnitudeName,
        smallMagnitudeName
      } = getMagnitudesAndNames(
        span_1_magnitude,
        span_2_magnitude,
        span_1_name,
        span_2_name
      )

      return (
        <div className="w-100">
          <h2>{title}</h2>
          <p>author: {user_name}</p>
          {description && <ReactMarkdown source={description} />}
          <div className="tc">
            {localStorage.user_id !== undefined &&
              String(user_id) === localStorage.user_id && (
                <div>
                  <div>
                    <Link to="/update">edit</Link> |{' '}
                    <a onClick={this.toggleDeleteState} href="/update">
                      delete
                    </a>
                  </div>
                  {this.state.userChoseDelete && (
                    <div className="mt3">
                      Are you sure you want to delete this Magnitood?{' '}
                      <a onClick={this.toggleDeleteState} href="">
                        No
                      </a>{' '}
                      |{' '}
                      <a onClick={this.deleteMagnitood()} href="">
                        Yes
                      </a>
                    </div>
                  )}
                </div>
              )}
          </div>
          <div className="ml3 mt4 mb0">
            <ComparisonAnimation
              bigMagnitude={bigMagnitude}
              bigMagnitudeName={bigMagnitudeName}
              smallMagnitude={smallMagnitude}
              smallMagnitudeName={smallMagnitudeName}
              unit={unit}
              spanLength={maxChunks}
            />
          </div>
        </div>
      )
    }
    return <div>loading...</div>
  }
}
