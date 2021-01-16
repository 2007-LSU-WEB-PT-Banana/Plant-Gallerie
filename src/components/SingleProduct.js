import React from 'react';


const SingleProduct = (props) => {
  const { activeProduct, setActiveProduct, history } = props;

  function cancelOption(event) {
    event.preventDefault(); 
    setActiveProduct(""); 
    history.goBack();
  }

  return (
    <>
    <div className="singleProduct">
      <img src={activeProduct.imageURL} alt="plant" height="400" width="400"></img>
      <p>{activeProduct.name}</p>
      <p>{activeProduct.description}</p>
      <p>${activeProduct.price}</p>
      {activeProduct.inStock ? <p>Currently in stock!</p> : <p>Currently on backorder</p>}
    </div>
         
    <div className="cartOptions">
      <div className="quantity buttons_added">
        <input type="button" value="-" className="minus" />
        <input type="number" step="1" min="1" max="" name="quantity" value="1" title="Qty" className="input-text qty text" size="4" pattern="" inputMode="" />
        <input type="button" value="+" className="plus" />
      </div>
      <button className="addToCart">Add to Cart</button>
      <button className="cancel"
        onClick={cancelOption}>Cancel</button>
    </div>   
    </>
)}

export default SingleProduct;