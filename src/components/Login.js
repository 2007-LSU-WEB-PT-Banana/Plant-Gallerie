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
	const { setIsLoggedIn, history, setCartData } = props;

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const login = async (event) => {
		event.preventDefault();
		try {
			const result = await loginUser(username, password);
			console.log("the result from logging in is", result);
			setIsLoggedIn(true);

			let url = `${BASE_URL}/orders/cart/${result.id}`;
			const fetchOptions = {
				method: "GET",
				headers: {
					"Content-Type": "application.json",
				},
			};
			const response = await fetch(url, fetchOptions);
			console.log("the response in the LOGIN file is:", response);
			const data = await response.json();
			console.log("the data is now", data);
			setCartData(data[0]);
			history.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	// const getCartData = async () => {
	// 	const url = `${BASE_URL}/orders/cart`;
	// 	const response = await fetch(url, {
	// 		method: "GET",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify(sendData),
	// 	});

	// 	const { error, cart } = await response.json();

	// 	if (error) {
	// 		throw Error(error.message);
	// 	}
	// 	console.log("this is the cart from the front end request", cart);
	// 	return cart;
	// };

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
