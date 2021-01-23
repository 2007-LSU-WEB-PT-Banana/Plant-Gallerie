// import axios from 'axios'

export const BASE_URL = "/api";

export const getToken = () => {
  if (localStorage.getItem('auth-token')) {
    return localStorage.getItem('auth-token')
  } else {
    localStorage.removeItem('auth-token')
  }
}

export const clearToken = () => {
  localStorage.removeItem('auth-token')
}

const setToken = (token) => {
  localStorage.setItem('auth-token', token)
}

function buildHeaders() {
  let base = {
    'Content-Type': 'application/json',
  }

  if (getToken()) {
    base['Authorization'] = `Bearer ${getToken()}`
  }
  return base
}

export const getActiveUser = async () => {
  const url = `${BASE_URL}/users/me`
  const response = await fetch(url, {
    method: 'GET',
    headers: buildHeaders(),
  })

  const { error, user } = await response.json()
  console.log('response from getting single user is ', response)

  if (error) {
    throw Error(error.message)
  }
  console.log('this is user fron end fetcgh', user)
  return user
}

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
  console.log('inside auth')
  const url = `${BASE_URL}/login`
  console.log('after url')

  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
  console.log('this is respones', response)
  const { error, user, token } = await response.json()

  if (error) {
    throw Error(error.message)
  }

  if (token) {
    console.log('this is token in login', token)
    setToken(token)
  }

  return user
}

export const NewUser = async (
  firstName,
  lastName,
  email,
  imageURL,
  username,
  password,
) => {
  const url = `${BASE_URL}/register`
  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageURL: imageURL,
    }),
  })
  const { error, user, token } = await response.json()

  if (error) {
    throw Error(error.message)
  }

  if (token) {
    setToken(token)
  }

  return user
}

// export const getOrdersandProducts = async () => {
//   const url = `${BASE_URL}/oders/cart`
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: buildHeaders(),
//   })

//   const { error, data } = await response.json()
//   console.log('The response we are receiving in the fetch is', data)
//   if (error) {
//     throw error
//   }

//   return data
// }

export const fetchAPI = async (url, method = 'GET', sendData = null) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (sendData) {
    if (sendData.price) {
      let newPrice = sendData.price * 100
      sendData.price = newPrice
    }
    fetchOptions.body = JSON.stringify(sendData)
  }

  console.log('this is what we are sending in the fetch', fetchOptions)

  const response = await fetch(url, fetchOptions)
  const data = await response.json()
  console.log('The response we are receiving in the fetch is', data)

  return data
}
