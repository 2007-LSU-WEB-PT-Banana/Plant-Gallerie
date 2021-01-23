import React from 'react'
import SingleOrder from './SingleOrder'

const Cart = (props) => {
  const {
    cartData,
    setCartData,
    history,
    visitorCartData,
    setVisitorCartData,
  } = props

  return (
    <SingleOrder
      cartData={cartData}
      history={history}
      setCartData={setCartData}
      setVisitorCartData={setVisitorCartData}
    />
  )
}

export default Cart
