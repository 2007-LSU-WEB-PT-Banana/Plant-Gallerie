import React, { useState, useEffect } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  useHistory,
  Link,
} from 'react-router-dom'
import { getSomething } from '../api'
import Header from './Header'
import img from '../images/home-image.jpg'
import Button from '@material-ui/core/Button'
import { fetchAPI, BASE_URL } from '../api'
import { AllProducts, SingleProduct } from './index'

const App = () => {
  const history = useHistory()
  const [message, setMessage] = useState('')
  const [productList, setProductList] = useState([])
  const [activeProduct, setActiveProduct] = useState('')

  useEffect(() => {
    fetchAPI(BASE_URL + '/')
      .then((response) => {
        console.log('the initial get response is', response)
        setMessage(response.message)
      })
      .catch((error) => {
        setMessage(error.message)
      })
  })

  useEffect(() => {
    fetchAPI(BASE_URL + '/products')
      .then((data) => {
        console.log('The product list is', data)
        setProductList(data)
      })
      .catch(console.error)
  }, [])

  const imgStyle = {
    height: '95vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    padding: '30px',
  }

  const headingPrimary = {
    color: 'black',
    textTransform: 'uppercase',
    backfaceVisibility: 'hidden',
    marginBotton: '60px',
  }

  const headingMain = {
    display: 'block',
    fontSize: '50px',
    fontWeight: '400',
    letterSpacing: '20px',
  }

  const headingMainSub = {
    display: 'block',
    fontSize: '20px',
    fontWeight: '400',
    letterSpacing: '15px',
  }

  const textBox = {
    position: 'absolute',
    top: '20%',
    left: '10%',
    textAlign: 'center',
  }

  const btn = {
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '15px 40px',
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <Header />
            <div className="main-page-image">
              <img src={img} style={imgStyle} />
            </div>
            <div className="text-box" style={textBox}>
              <h1 className="heading-primary" style={headingPrimary}>
                <span className="heading-main" style={headingMain}>
                  buy 2 plants for $200
                </span>
                <pan className="heading-main-sub" style={headingMainSub}>
                  plus free shipping
                </pan>
              </h1>
              <Button className="btn btn-white" style={btn}>
                {' '}
                Shop Now
              </Button>
            </div>
            <Route exact path="/products/:productId">
              <Header />
              <SingleProduct
                activeProduct={activeProduct}
                setActiveProduct={setActiveProduct}
                history={history}
              />
            </Route>
            <Route exact path="/products">
              <Header />
              <AllProducts
                productList={productList}
                history={history}
                setActiveProduct={setActiveProduct}
              />
            </Route>
          </Route>
          <Route patch="/houseplants">
            <Header />
          </Route>
          <Route path="/floweringplants">
            <Header />
          </Route>
          <Route path="/bonsaiplants">
            <Header />
          </Route>
          <Route path="/login">
            <Header />
            <Route path="/cart">
              <Header />
            </Route>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
