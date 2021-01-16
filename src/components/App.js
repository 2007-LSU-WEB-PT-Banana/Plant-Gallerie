import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import './Home.css';
import { fetchAPI, BASE_URL } from '../api'
import { 
  AllProducts, 
  SingleProduct, 
  Header, 
  Login, 
  FloweringPlants, 
  BonsaiPlants, 
  HousePlants, 
  Home
} from './index'
import CartComponent from "./Cart"


const App = () => {
  const history = useHistory()
  const [message, setMessage] = useState('')
  const [productList, setProductList] = useState([])
  const [activeProduct, setActiveProduct] = useState('')
  const [cartData, setCartData] = useState({}); 

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
        data.map((product) => {
          let newPrice = product.price / 100;
          product.price = newPrice;
        })
        setProductList(data)
      })
      .catch(console.error)
  }, [])

  return (
    <>
    <header>
      <Header />
    </header>
    <main class="wrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={`/products/:productId`}>
          <SingleProduct
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
            history={history}/>
        </Route>
        <Route exact path="/products">
          <AllProducts
            productList={productList}
            history={history}
            setActiveProduct={setActiveProduct}/>
        </Route>
        <Route exact path="/houseplants">
          <HousePlants productList={productList} setActiveProduct={setActiveProduct} history={history} />
        </Route>
        <Route exact path="/floweringplants">
          <FloweringPlants productList={productList} setActiveProduct={setActiveProduct} history={history} />
        </Route>
        <Route exact path="/bonsaiplants">
          <BonsaiPlants productList={productList} setActiveProduct={setActiveProduct} history={history} />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route path="/cart">
          <CartComponent cartData={cartData}
            setCartData={setCartData} />
        </Route>
      </Switch>
    </main>
  </>
  )
}

export default App;
