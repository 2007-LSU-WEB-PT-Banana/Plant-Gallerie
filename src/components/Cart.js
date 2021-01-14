import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardActions, Typography, CardActionArea, CardMedia} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {
    fetchAPI, BASE_URL} from '../api';



const cartItems = [ {"price" : "5.00", "productName": "potted flower", "quantity": "1" },
{"price" : "15.00", "productName": "fern", "quantity": "2" },
{"price" : "55.00", "productName": "flower pot", "quantity": "3" }];




const CartComponent = (props) => {

    const [getCart, setCart] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [getPrice, setPrice] = ("");
    const [updateCart, setUpdateCart] = useState('');
    const [cartData, setCartData] = useState([]);
   // const {username} = username;
   const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 100,
      width: 100,
    },
  });
  


   const classes = useStyles();

//   useEffect( () => {
//     fetchAPI(BASE_URL + '/orders/cart')
//       .then((data) => {
//         console.log('CARTAPI', data)
//         setCartData(data);
//       })
//       .catch(console.error);
//   }, []);


   


    return <div>
  

    <div >
    <h1 style={{"fontSize": "80px",
    "display":"flex", "textAlign": "center", "justifyContent": "center" }}> Here is your cart</h1>

    <div style={{"display":"inline-block", "float": "right"}}>
      <h2> Here is Your Total</h2> 
      <div style={{"display":"flex","height": "250px", "width": "300px", "background": "red", "fontSize": "40px", "textAlign": "center",
      "justifyContent":"center", "verticalAlign": "middle"}}>
            72.99
      </div>
    </div>


    {cartItems.map((currentCartItems) =>{
        const {price, productName, quantity} = currentCartItems;

        return<div style={{"display":"flex", "flexDirection": "column", "flexWrap":"wrap"}} key={price}>
        <Card variant="outlined"  key={price} style={{"height": "270px", "width": "650px", "margin": "10px"}}>
        <CardActionArea>
        <CardMedia
        component="img"
        alt="image not found"
         height= "180"
         width="150"
          image="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1533&q=80"
          title="Contemplative Reptile"
        />
            <CardContent>
        {/* <Typography>{cartItems.price}</Typography> */}

       <Typography  variant="body2" color="textSecondary" component="p">{productName }</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{quantity }</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{price }</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small"> add</Button>
        <Button size="small"> Delete</Button>

        </CardActions>
        </Card>
        </div> 
    })}


    </div>


    </div>


}

export default CartComponent;