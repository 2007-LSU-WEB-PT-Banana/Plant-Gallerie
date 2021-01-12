import React, {useEffect, useState} from 'react';




const cartItems = [ {"price" : "5.00", "productName": "potted flower", "quantity": "1" },
{"price" : "15.00", "productName": "fern", "quantity": "2" },
{"price" : "55.00", "productName": "flower pot", "quantity": "3" }]

const CartComponent = (props) => {

    const [getCart, setCart] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [getPrice, setPrice] = ("");
    const [updateCart, setUpdateCart] = useState('');
   // const {username} = username;



    return <div>

    <div>
    <h2> this is the cart</h2>
    {cartItems.map((currentCartItems) =>{
        const {price, productName, quantity} = currentCartItems;

        return <div>
        <h3>{cartItems.price}</h3>
        <h4>{price }</h4>
        <h4>{productName }</h4>
        <h4>{quantity }</h4>
        </div>
    })}


    </div>


    </div>


}

export default CartComponent;