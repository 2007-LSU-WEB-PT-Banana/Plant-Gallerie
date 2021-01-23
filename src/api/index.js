<<<<<<< HEAD
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
	const url = `${BASE_URL}/users/me`
	const response = await fetch(url, {
		method: 'GET',
		headers: buildHeaders(),
	});

	const { error, user } = await response.json();

	if (error) {
		throw Error(error.message);
	}
	return user;
};

// export const getCartData = async () => {
// 	const url = `${BASE_URL}/orders/cart`;
// 	const user = activeUser || null;
// 	const response = await fetch(url, {
// 		method: "GET",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ user }),
// 	});
// 	console.log("response from getCartData on frontend", response);

// 	const { error, cart } = await response.json();

// 	if (error) {
// 		throw Error(error.message);
// 	}
// 	console.log("this is the cart from the front end request", cart);
// 	return cart;
// };

export const loginUser = async (username, password) => {
	console.log("inside auth");
	const url = `${BASE_URL}/login`;
	console.log("after url");

	const response = await fetch(url, {
		method: "POST",
		headers: buildHeaders(),
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});
	console.log("this is response", response);
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
			sendData.price = newPrice;
		}
		fetchOptions.body = JSON.stringify(sendData);
	}

	const response = await fetch(url, fetchOptions);
	const data = await response.json();

	return data;
};
=======
//import axios from 'axios';

export const BASE_URL = '/api';

export const fetchAPI = async (url, method="GET", sendData=null) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }
  
  console.log("this is what we are sending in the fetch", fetchOptions);
  //console.log("this is the initial response:", response);

  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  
  return data;
}

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
>>>>>>> origin/main
