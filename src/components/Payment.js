import React, { useState } from 'react'
import Chekout from './Chekout'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'

toast.configure()

function Payment(props) {
  const [product, setProduct] = useState({
    name: 'plant name',
    price: 10,
    productBy: 'arman',
  })

  async function handleToken(token, adresses) {
    console.log({
      token,
      adresses,
    })
    const result = await axios.post('/api/payment', {
      token,
      product,
    })
    const { status } = result.data
    if (status === 'success') {
      toast('sucess! check email for detail', { type: 'success' })
    } else {
      toast('something went wrong', { type: 'error' })
    }
  }

  return (
    <div>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_MYPKEY}
        token={handleToken}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name={product.name}
      >
        <button>BUY product for {product.price}</button>
      </StripeCheckout>
    </div>
  )
}

export default Payment
