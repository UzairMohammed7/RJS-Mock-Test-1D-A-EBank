import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="navbar-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <h1 className="digital-card-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="digital-card-img"
      />
    </div>
  )
}

export default Home
