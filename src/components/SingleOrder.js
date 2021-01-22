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
		orderId,
	} = props;

	const [count, setCount] = useState("");
	const [message, setMessage] = useState("");

	function continueShopping() {
		history.goBack();
	}
	console.log("on the cart page, the active user is", activeUser);

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

	async function removeItem(idx) {
		if (activeUser) {
			let sendData = { productId: cartData[idx].id };
			console.log("the sendData is", sendData);
			let changedOrder = await fetchAPI(
				BASE_URL + "/order_products/" + orderId,
				"DELETE",
				sendData
			);
			let total = 0;
			changedOrder.map((product) => {
				let newPrice = product.price / 100;
				product.price = newPrice;
				total = newPrice * product.quantity + total;
			});
			setCartData(changedOrder);
			return;
		} else {
			let newCartData = cartData.slice();
			newCartData.splice(idx, 1);
			setCartData(newCartData);
		}
	}

	async function visitorCartUpdate(idx) {
		let updatedCount = count + cartData[idx].quantity;

		let updatedCartItem = {
			quantity: updatedCount,
		};

		let newCartData = cartData.slice();
		newCartData.splice(idx, 1, updatedCartItem);
		setCartData(newCartData);
		setCount(1);
		setMessage("Updated Cart");
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
					<p>${grandTotal.toFixed(2)}</p>
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
							{/* these buttons will need to depend on whether there is an activeUser */}
							<button className="updateQty">Update Quantity</button>
							<button
								className="removeItem"
								onClick={(event) => {
									event.preventDefault();
									removeItem(index);
								}}
							>
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
