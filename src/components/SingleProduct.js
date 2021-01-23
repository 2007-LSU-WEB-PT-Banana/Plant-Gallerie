import React, { useState } from 'react'
import { BASE_URL, fetchAPI } from '../api'

const SingleProduct = (props) => {
  const {
    activeProduct,
    setActiveProduct,
    history,
    count,
    setCount,
    cartData,
    setCartData,
    orderId,
    activeUser,
    setVisitorCartData,
    search,
    setSearch,
  } = props

  //deCha will rework the "add to Cart" function so that it sends the cartData to the database for authenticated users
  const [message, setMessage] = useState('')

  function backToSearch(event) {
    event.preventDefault()
    setActiveProduct('')
    setMessage('')
    history.goBack()
  }

  function incrementCount() {
    let newCount = count + 1
    setCount(newCount)
  }

  function decrementCount() {
    let newCount = count - 1
    setCount(newCount)
  }

  let match = -1
  match = cartData.findIndex((x) => x.id === activeProduct.id)

  async function updateCart() {
    //if the current item matches anything in the cart, "match" will update to be the index of that item
    //in the cartData array
    if (match === -1) {
      try {
        let newCartItem = {
          productId: activeProduct.id,
          price: activeProduct.price,
          productName: activeProduct.name,
          quantity: count,
          id: activeProduct.id,
          image: activeProduct.imageURL,
        }

        const newCart = await fetchAPI(
          BASE_URL + '/orders/' + orderId + '/products',
          'POST',
          newCartItem,
        )
        setCartData(newCart)
        setCount(1)
        setMessage('Added to Cart')
      } catch (error) {
        throw error
      }
    } else {
      try {
        let updatedCount = count + cartData[match].quantity
        let updatedCartItem = {
          productId: activeProduct.id,
          price: activeProduct.price,
          quantity: updatedCount,
        }
        const updatedCart = await fetchAPI(
          BASE_URL + '/order_products/' + orderId,
          'PATCH',
          updatedCartItem,
        )
        console.log('the updated cart is', updatedCart)
        setCartData(updatedCart)
        setCount(1)
        setMessage('Updated Cart')
      } catch (error) {
        throw error
      }
    }
  }

  return (
    <>
      <button className="backButton" onClick={backToSearch}>
        Back to Search
      </button>
      <div className="singleProduct">
        <img
          src={activeProduct.imageURL}
          alt="plant"
          height="400"
          width="400"
        ></img>
        <h2 className="singleProductName">{activeProduct.name}</h2>
        <p>{activeProduct.description}</p>
        <p>${activeProduct.price}</p>
        {activeProduct.inStock ? (
          <p>Currently in stock!</p>
        ) : (
          <p>Currently on backorder</p>
        )}
        <div className="cartOptions">
          <div className="quantity buttons_added">
            <input
              type="button"
              value="-"
              className="minus"
              onClick={decrementCount}
            />
            <input
              readOnly
              type="number"
              step="1"
              min="1"
              max=""
              name="quantity"
              value={count}
              title="Qty"
              className="input-text qty text"
              size="4"
              pattern=""
              inputMode=""
            />
            <input
              type="button"
              value="+"
              className="plus"
              onClick={incrementCount}
            />
          </div>
          <button className="addToCart" onClick={updateCart}>
            Add to Cart
          </button>
          <p className="addToCartMessage">{message}</p>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
