import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Route,
  Link,
  useHistory,
  Switch,
} from 'react-router-dom'

import { fetchAPI, BASE_URL } from '../api'

import { AllProducts, SingleProduct, Login } from './index'

const App = () => {
  const [message, setMessage] = useState('')
  const [productList, setProductList] = useState([])
  const [activeProduct, setActiveProduct] = useState('')

  return <div className="App"></div>
}

export default App
