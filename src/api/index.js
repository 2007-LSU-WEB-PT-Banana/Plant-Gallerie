//import axios from 'axios';

export const BASE_URL = '/api'

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

export const auth = async (username, password, isNew = false) => {
  const url = `${BASE_URL}/users` + (isNew ? '/register' : '/login')

  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })

  const { error, data } = await response.json()

  if (error) {
    throw Error(error.message)
  }

  if (data && data.token) {
    setToken(data.token)
  }

  return data
}

export const fetchAPI = async (url, method = 'GET', sendData = null) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData)
  }

  console.log('this is what we are sending in the fetch', fetchOptions)
  //console.log("this is the initial response:", response);

  const response = await fetch(url, fetchOptions)
  const data = await response.json()

  return data
}

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
