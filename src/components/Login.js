import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import {
	getToken,
	setToken,
	clearToken,
	loginUser,
	fetchAPI,
	BASE_URL,
} from "../api/index";
import { AirlineSeatIndividualSuiteSharp } from "@material-ui/icons";
function Login(props) {
	const {
		setIsLoggedIn,
		currentUser,
		setCurrentUser,
		message,
		setMessage,
		setActiveUser,
		setCartData,
		setOrderId,
	} = props;
	const history = useHistory();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const login = async (event) => {
		event.preventDefault();
		try {
			const result = await loginUser(username, password);
			if (!result) {
				throw "wrong login";
			}
			setIsLoggedIn(true);
			history.push("/");
		} catch (error) {
			setErrorMessage(
				"User name or password is incorrect/ user not registered"
			);
		}
	};
	const register = (event) => {
		history.push("/register");
	};
	return (
		<div className="login">
			<div className="login-container">
				{errorMessage ? <h5 style={{ color: "red" }}>{errorMessage}</h5> : null}
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
