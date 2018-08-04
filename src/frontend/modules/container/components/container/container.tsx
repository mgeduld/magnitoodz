import 'tachyons/css/tachyons.css'
import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { Editor, Magnitood, MagnitoodzList } from '../../../magnitoodz'
import { Login, Signup } from '../../../authentication'
import { IComparison } from '../../../../../shared/interfaces/comparison'
import { AuthenticationState } from '../../../../enums/authentication'
import { ICredentials } from '../../../../../shared/interfaces/authentication'
import { requestMagnitoodz } from '../../action-creators'

interface IProps {
  magnitood: IComparison
  magnitoodz: IComparison[]
  magnitoodzCount: number
  requestLogIn: Function
  requestLogOut: Function
  requestMagnitood: Function
  requestMagnitoodz: Function
  postMagnitood: Function
  requestSignup: Function
  changeAuthenticationState: Function
  authenticationState: AuthenticationState
  userId: number
  userName: string
}

export const Container: React.SFC<IProps> = ({
  magnitood,
  magnitoodz,
  magnitoodzCount,
  requestLogIn,
  requestLogOut,
  requestMagnitood,
  requestMagnitoodz,
  postMagnitood,
  requestSignup,
  authenticationState,
  changeAuthenticationState,
  userId,
  userName
}) => {
  const onSubmitSignup = (credentials: ICredentials) => {
    requestSignup(credentials)
    changeAuthenticationState(AuthenticationState.signingUp)
  }

  const onLogin = (credentials: ICredentials) => {
    requestLogIn(credentials)
    changeAuthenticationState(AuthenticationState.loggingIn)
  }

  const shouldShowAuthenticationLinks =
    [
      AuthenticationState.loggedOut,
      AuthenticationState.signUpFailed,
      AuthenticationState.logInFailed
    ].indexOf(authenticationState) !== -1

  return (
    <div>
      <div className="ml4 w-70">
        <div className="dark-green">
          <p>
            Magnitoodz lets you compare sizes, distances, timespans and other
            numbers, displayimg the results as line charts, so that they can be
            easily visualized.
          </p>
          <p>
            It was inspired by Carl Sagan's{' '}
            <a
              className="dark-green"
              href="https://en.wikipedia.org/wiki/Cosmic_Calendar"
            >
              Cosmic Calendar
            </a>, which illustrated huge differences between the age of the
            Universe and the age of our civilization.
          </p>
          <div className="tc mt4">
            <span>
              <Link to="/">home</Link>
            </span>
            {shouldShowAuthenticationLinks && (
              <span>
                {' '}
                | <Link to="/login">log in</Link> |{' '}
                <Link to="/signup">sign up</Link>
              </span>
            )}
            {!shouldShowAuthenticationLinks && (
              <span>
                {' '}
                |{' '}
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault()
                    requestLogOut()
                  }}
                >
                  log out
                </a>
              </span>
            )}
            {userId !== undefined && (
              <span>
                {' '}
                | <Link to="/create">[+] New Magnitood</Link>
              </span>
            )}
          </div>
          {userId !== undefined && (
            <div className="tc mt4">
              <span>Hello, {userName}!</span>
            </div>
          )}
        </div>
        <div className="ma3 bg-black">
          <Route
            exact
            path="/"
            render={() => {
              return (
                <MagnitoodzList
                  magnitoodz={magnitoodz}
                  count={magnitoodzCount}
                  requestMagnitoodz={requestMagnitoodz}
                />
              )
            }}
          />
          <Route
            exact
            path="/magnitood/:id"
            render={({ match }) => {
              return (
                <Magnitood
                  magnitood={magnitood}
                  id={match.params.id}
                  onInit={requestMagnitood}
                />
              )
            }}
          />
          <Route
            exact
            path="/create"
            render={() => {
              return (
                <Editor userId={userId} onSubmitMagnitood={postMagnitood} />
              )
            }}
          />
          <Route
            exact
            path="/signup"
            render={() => {
              return (
                <Signup
                  authenticationState={authenticationState}
                  onSubmitSignup={onSubmitSignup}
                />
              )
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              return (
                <Login
                  authenticationState={authenticationState}
                  onLogin={onLogin}
                />
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
