import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardActions, Typography } from "@material-ui/core"




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
    <h1 style={{"fontSize": "80px",
    "display":"flex", "textAlign": "center", "justifyContent": "center" }}> Here is your cart</h1>
    {cartItems.map((currentCartItems) =>{
        const {price, productName, quantity} = currentCartItems;

        return <Card variant="outlined">
            <CardContent>
        {/* <Typography>{cartItems.price}</Typography> */}

        <Typography>{price }</Typography>
        <Typography>{productName }</Typography>
        <Typography>{quantity }</Typography>
        </CardContent>
        <CardActions>
        <Button size="small"> add</Button>
        <Button size="small"> Delete</Button>

        </CardActions>
        </Card>
    })}


    </div>


    </div>


}

export default CartComponent;