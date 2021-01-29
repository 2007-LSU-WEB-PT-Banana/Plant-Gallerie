// import axios from 'axios'

export const BASE_URL = "/api";

export const getToken = () => {
	if (localStorage.getItem("auth-token")) {
		return localStorage.getItem("auth-token");
	} else {
		localStorage.removeItem("auth-token");
	}
};

export const clearToken = () => {
	localStorage.removeItem("auth-token");
};

const setToken = (token) => {
	localStorage.setItem("auth-token", token);
};

function buildHeaders() {
	let base = {
		"Content-Type": "application/json",
	};

	if (getToken()) {
		base["Authorization"] = `Bearer ${getToken()}`;
	}
	return base;
}

export const getActiveUser = async () => {
	const url = `${BASE_URL}/users/me`;
	const response = await fetch(url, {
		method: "GET",
		headers: buildHeaders(),
	});

	const { error, user } = await response.json();

	if (error) {
		throw Error(error.message);
	}

	return user;
};

export const loginUser = async (username, password) => {
	const url = `${BASE_URL}/login`;

	// const response = await fetch(url, {
	//   method: 'POST',
	//   headers: buildHeaders(),
	//   body: JSON.stringify({
	//     username: username,
	//     password: password,
	//   }),
	// })

	// const { error, user, token } = await response.json()

	// if (error) {
	//   throw Error(error.message)
	// }

	const response = await fetch(url, {
		method: "POST",
		headers: buildHeaders(),
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});

	const { error, user, token } = await response.json();

	if (error) {
		throw Error(error.message);
	}

	if (token) {
		setToken(token);
	}

	return user;
};

export const NewUser = async (
	firstName,
	lastName,
	email,
	imageURL,
	username,
	password
) => {
	const url = `${BASE_URL}/register`;
	const response = await fetch(url, {
		method: "POST",
		headers: buildHeaders(),
		body: JSON.stringify({
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName,
			email: email,
			imageURL: imageURL,
		}),
	});
	const { error, user, token } = await response.json();

	if (error) {
		throw Error(error.message);
	}

	if (token) {
		setToken(token);
	}

	return user;
};

export const fetchAPI = async (url, method = "GET", sendData = null) => {
	const fetchOptions = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (sendData) {
		if (sendData.price) {
			let newPrice = sendData.price * 100;
			sendData.price = newPrice.toFixed(0);
		}
		fetchOptions.body = JSON.stringify(sendData);
	}

	const response = await fetch(url, fetchOptions);
	const data = await response.json();

	return data;
};

export const deleteProduct = async (url, sendData) => {
	const fetchOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(sendData),
	};

	const response = await fetch(url, fetchOptions);
	const data = await response.json();

	return data;
};
