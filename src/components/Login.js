import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
  }

  const register = (event) => {}
  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />

          <button onClick={login} type="submit" className="login-siginbutton">
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to Plant Gallerie Terms and Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies and our
          interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login-createbutton">
          Create your Plant Gallerie Account
        </button>
      </div>
    </div>
  )
}

export default Login
