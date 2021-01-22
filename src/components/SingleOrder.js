import { SignalCellularNoSimOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { BASE_URL, fetchAPI } from "../api";
import "./SingleOrder.css";

const SingleOrder = (props) => {
	const {
		cartData,
		setCartData,
		activeUser,
		history,
		isLoggedIn,
		grandTotal,
		setGrandTotal,
	} = props;

	function continueShopping() {
		history.goBack();
	}
	//	this function will need to be reworked depending on how the backend ends up
	// async function setOrderData() {
	// 	try {
	// 		let sendData = {
	// 			userId: activeUser,
	// 		};

	// 		let orderInfo = await fetchAPI(
	// 			BASE_URL + "/orders/cart",
	// 			"GET",
	// 			sendData
	// 		);
	// 		setCartData(); //something goes here
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	function removeItem(index) {
		//will need to write this function to send a patch request to the db and then re-render the cart
		if (activeUser) {
			//fetch will be done here
		} else {
			//slice, splice, and resetCart
		}
	}

	function findGrandTotal() {
		let newGrandTotal = 0;

		cartData.map((product) => {
			let extendedPrice = product.price * product.quantity;
			newGrandTotal = newGrandTotal + extendedPrice;
		});
		setGrandTotal(newGrandTotal);
	}

	useEffect(() => {
		findGrandTotal();
	}, [cartData]);

	return (
		<div>
			<h1>Order Detail</h1>

			<div className="orderOptions">
				<button onClick={continueShopping}>Continue Shopping</button>
				<button>Checkout</button>
				<div
					style={{
						display: "inline-block",
						float: "right",
						marginRight: "25px",
					}}
				>
					<h3>Order Total</h3>
					<p>${grandTotal}</p>
				</div>
			</div>

			<div className="cartCardWrapper">
				{cartData.map((product, index) => {
					return (
						<div className="cartCard" value={index}>
							<img
								src={product.imageURL}
								alt="plant"
								height="200"
								width="200"
							></img>
							<h4 className="productName">{product.name}</h4>
							<p className="productQty">Quantity: {product.quantity}</p>
							<p className="productPrice">Price: ${product.price}</p>
							<button className="updateQty">Update Quantity</button>
							<button className="removeItem" onClick={removeItem(index)}>
								Remove Item
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SingleOrder;
