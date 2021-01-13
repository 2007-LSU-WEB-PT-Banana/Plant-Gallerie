import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useHistory,
  Link,
} from 'react-router-dom'
import img from '../images/home-image.jpg'
import Button from '@material-ui/core/Button'
import { fetchAPI, BASE_URL } from '../api'
import { AllProducts, SingleProduct, Header } from './index'
import CartComponent from "./Cart"

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

  const headingTitle = {
    display: 'block',
    fontSize: '50px',
    fontWeight: '400',
    letterSpacing: '20px',
    paddingBottom: '1em',
    textAlign: 'center',
  }
  
  const headingMain = {
    display: 'block',
    fontSize: '40px',
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
    color: 'black',
  }

  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div className="main-page-image">
              <img src={img} style={imgStyle} />
            </div>
            <div className="text-box" style={textBox}>
              <h1 className="heading-primary" style={headingPrimary}>
                <span className="heading-title" style={headingTitle}>
                  Plant Gallerie
                  </span><span className="heading-main" style={headingMain}>
                  buy 3 plants for $200
                </span>
                <span className="heading-main-sub" style={headingMainSub}>
                  plus free shipping
                </span>
              </h1>
              <Button className="btn btn-white" style={btn}>
                <Link to="/products" className='allProdLink'>Shop Now
                </Link>
              </Button>
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
          </Route>
          <Route exact path="/floweringplants">
          </Route>
          <Route exact path="/bonsaiplants">
          </Route>
          <Route exact path="/login">
          </Route>
          <Route exact path="/cart">
          </Route>
          <Route path="/cart">
         
              <CartComponent cartData={cartData}
                setCartData={setCartData}
              />
            </Route>
        </Switch>
      </div>
    </main>
    </>
  )
}

export default App;
