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

export const auth = async (username, password) => {
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
  const { error, data } = await response.json()

  if (error) {
    throw Error(error.message)
  }

  if (data && data.token) {
    setToken(data.token)
  }

  return data
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

  const response = await fetch(url, fetchOptions)
  const data = await response.json()

  return data
}
