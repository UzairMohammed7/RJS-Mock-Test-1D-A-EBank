import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
    submitError: false,
  }

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = failMsg => {
    this.setState({
      errorMsg: failMsg,
      submitError: true,
    })
  }

  onLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const loginApiUrl = `https://apis.ccbp.in/ebank/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, errorMsg, submitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route-container">
        <div className="img-login-container">
          <img
            className="website-login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />

          <form className="login-container" onSubmit={this.onLogin}>
            <h1 className="welcome-heading">Welcome Back!</h1>
            <label htmlFor="userId" className="label">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={this.onChangeUserID}
              placeholder="Enter User ID"
              className="input"
            />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={this.onChangePin}
              placeholder="Enter PIN"
              className="input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {submitError ? <p className="err-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
