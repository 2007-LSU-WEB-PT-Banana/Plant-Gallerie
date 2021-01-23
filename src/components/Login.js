import React, { useState } from "react";
import "./Login.css";
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
	const { setIsLoggedIn, history, setCartData, setOrderId } = props;

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const login = async (event) => {
		event.preventDefault();
		try {
			const result = await loginUser(username, password);
			setIsLoggedIn(true);

			// let url = `${BASE_URL}/orders/cart/${result.id}`;
			// const fetchOptions = {
			// 	method: "GET",
			// 	headers: {
			// 		"Content-Type": "application.json",
			// 	},
			// };
			// const response = await fetch(url, fetchOptions);
			// const data = await response.json();
			// console.log("the data from the fetch is", data);
			// setCartData(data[0]);
			// setOrderId(data[0][0].orderId);
			history.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	const register = () => {
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
