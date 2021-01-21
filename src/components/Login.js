import React, { useState } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'
import { getToken, setToken, clearToken, loginUser } from '../api/index'


function Login(props) {
	const {
		setIsLoggedIn,
		currentUser,
		setCurrentUser,
		message,
		setMessage,
	} = props;
	const history = useHistory();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault()
    console.log('logging in')
    try {
      console.log('hhhhh')
      const result = await loginUser(username, password)
      console.log('this is result', result)
      setIsLoggedIn(true)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

	const register = (event) => {
		history.push("/register");
	};
	return (
		<div className="login">
			<div className="login-container">
				<h1>Sign In</h1>
				<form>
					<h5>Username</h5>
					<input
						type="username"
						value={username}
						onChange={(event) => setUserName(event.target.value)}
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
	);
}

export default Login;
