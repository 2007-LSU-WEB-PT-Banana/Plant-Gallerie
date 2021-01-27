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

  const completeOrder = () => {
    console.log('hello')
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
        console.log('problem us toast')
        toast('success! check email for detail', { type: 'success' })
      } else {
        toast('something went wrong', { type: 'error' })
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="stripe-header">
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
      <StripeCheckout
        stripeKey={process.env.REACT_APP_MYPKEY}
        token={handleToken}
        billingAddress
        shippingAddress
        amount={grandTotal * 100}
      >
        <button onClick={completeOrder} className="button-pay">
          BUY product for {grandTotal}
        </button>
      </StripeCheckout>
      <button onClick={cancelOrder} className="button-pay">
        Cancel Order
      </button>
    </div>
  )
}

export default Payment
