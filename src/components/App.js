import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory, Link } from 'react-router-dom'
import './App.css'
import { fetchAPI, BASE_URL, auth, getToken, clearToken } from '../api'

import {
  AllProducts,
  SingleProduct,
  Header,
  Login,
  FloweringPlants,
  BonsaiPlants,
  HousePlants,
  Register,
} from './index'
import CartComponent from './Cart'
import SingleOrder from './SingleOrder'

const App = () => {
  const history = useHistory()

  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [message, setMessage] = useState('')
  const [productList, setProductList] = useState([])
  const [activeProduct, setActiveProduct] = useState('')
  const [cartData, setCartData] = useState({})

  useEffect(() => {
    fetchAPI(BASE_URL + '/')
      .then((response) => {
        setMessage(response.message)
      })
      .catch((error) => {
        setMessage(error.message)
      })
  })

  useEffect(() => {
    fetchAPI(BASE_URL + '/products')
      .then((data) => {
        setProductList(data)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <div className="homepage">
                <div className="main-page-image"></div>
                <div className="text-box">
                  <h1 className="heading-primary">
                    <span className="heading-title">Plant Gallerie</span>
                  </h1>
                </div>
                <div className="main-page-subtext">
                  <span className="heading-main">buy 3 plants for $200</span>
                  <span className="heading-main-sub">plus free shipping</span>
                  <button className="main-image-button" id="shopButton">
                    <Link to="/products" className="allProdLink">
                      Shop Now
                    </Link>
                  </button>
                </div>
              </div>
            </Route>
            <Route exact path="/products/:productId">
              <SingleProduct
                activeProduct={activeProduct}
                setActiveProduct={setActiveProduct}
                history={history}
              />
            </Route>
            <Route exact path="/products">
              <AllProducts
                productList={productList}
                history={history}
                setActiveProduct={setActiveProduct}
              />
            </Route>
            <Route exact path="/houseplants">
              <HousePlants
                productList={productList}
                setActiveProduct={setActiveProduct}
                history={history}
              />
            </Route>
            <Route exact path="/floweringplants">
              <FloweringPlants
                productList={productList}
                setActiveProduct={setActiveProduct}
                history={history}
              />
            </Route>
            <Route exact path="/bonsaiplants">
              <BonsaiPlants
                productList={productList}
                setActiveProduct={setActiveProduct}
                history={history}
              />
            </Route>
            <Route exact path="/login">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/register">
              <Register setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/orders">
              <SingleOrder />
            </Route>
            <Route exact path="/cart"></Route>
            <Route path="/cart">
              <CartComponent cartData={cartData} setCartData={setCartData} />
            </Route>
          </Switch>
        </div>
      </main>
    </>
  )
}

export default App
