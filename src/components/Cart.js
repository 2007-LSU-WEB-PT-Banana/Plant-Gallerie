import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  CardMedia,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchAPI, BASE_URL } from '../api'
import SingleOrder from './SingleOrder'

const cartItems = [
  { price: '5.00', productName: 'potted flower', quantity: '1' },
  { price: '15.00', productName: 'fern', quantity: '2' },
  { price: '55.00', productName: 'flower pot', quantity: '3' },
]

const CartComponent = (props) => {
  const [getCart, setCart] = useState([])
  const [orderId, setOrderId] = useState('')
  const [getPrice, setPrice] = ''
  const [updateCart, setUpdateCart] = useState('')
  const [cartData, setCartData] = useState([])

  const { id, price, productName, quantity } = props
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 100,
      width: 100,
    },
  })

  const classes = useStyles()

  return (
    <div>
      <div>
        <h1
          style={{
            fontSize: '80px',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          Here is your cart
        </h1>

        <div style={{ display: 'inline-block', float: 'right' }}>
          <h2> Here is Your Total</h2>
          <div
            style={{
              display: 'flex',
              height: '250px',
              width: '300px',
              background: 'red',
              fontSize: '40px',
              textAlign: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle',
            }}
          >
            72.99
          </div>
        </div>

        {cartItems.map((currentCartItems) => {
          return <SingleOrder price={cartItems.price} />
        })}
      </div>
    </div>
  )
}

export default CartComponent
