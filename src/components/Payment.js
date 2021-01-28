import React, { useState } from 'react'

import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'
import SingleOrder from './SingleOrder'
import './Payment.css'

toast.configure()

function Payment(props) {
  const {
    cartData,
    history,
    setCartData,
    isLoggedIn,
    grandTotal,
    setGrandTotal,
    orderId,
    activeUser,
  } = props

  const completeOrder = async () => {
    console.log('this is orderzid', orderId)
    try {
      if (activeUser) {
        const complete = await axios.get(`/api/orders/checkout/${orderId}`)
      } else {
        const body = cartData
        console.log('cart data', cartData)
        const newOrdr = await axios.post(`/api/orders`, cartData[0])
        await axios.get(`/api/orders/checkout/${newOrdr.orderId}`)
      }

      history.push('/success')
    } catch (error) {
      throw error
    }
  }

  const cancelOrder = () => {
    console.log('cancelling', cartData)
  }

  async function handleToken(token) {
    console.log(grandTotal)
    console.log({
      token,

      grandTotal,
    })
    try {
      console.log('hitting api')
      const url = 'api/payment'
      const result = await axios.post(url, {
        token,
        grandTotal,
      })
      console.log(';this is result', result)
      const { status } = result.data
      console.log('this is status', status)
      if (status == 'success') {
        completeOrder()
      } else {
        toast('something went wrong', { type: 'error' })
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="stripe-header">
      <StripeCheckout
        stripeKey={process.env.REACT_APP_MYPKEY}
        token={handleToken}
        billingAddress
        shippingAddress
        amount={parseInt(grandTotal * 100)}
      >
        <button className="button-pay">BUY product for {grandTotal}</button>
      </StripeCheckout>
      <button onClick={cancelOrder} className="button-pay">
        Cancel Order
      </button>

      <SingleOrder
        cartData={cartData}
        history={history}
        setCartData={setCartData}
        isLoggedIn={isLoggedIn}
        grandTotal={grandTotal}
        setGrandTotal={setGrandTotal}
        orderId={orderId}
        activeUser={activeUser}
      />
    </div>
  )
}

export default Payment
