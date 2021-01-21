import React, { useState, useEffect } from "react";
import { BASE_URL, fetchAPI } from "../api";
import "./SingleOrder.css";

const SingleOrder = (props) => {
	const { cartData, setCartData, activeUser, history } = props;
	const [grandTotal, setGrandTotal] = useState(0);

	function continueShopping() {
		history.goBack();
	}
	//this function will need to be reworked depending on how the backend ends up
	async function setOrderData() {
		try {
			let sendData = {
				userId: activeUser,
			};

			let orderInfo = await fetchAPI(
				BASE_URL + "/orders/cart",
				"GET",
				sendData
			);
			setCartData(...cartData, orderInfo.products); //this might be product with no "s" depending on how it's returned from the db
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		setOrderData();
	}, []);

	function findGrandTotal() {
		let findGrandTotal = 0;

		for (let i = 0; i < cartData.length; i++) {
			let pennyPrice = cartData[i].price / 100;
			let totalPennyPrice = pennyPrice * cartData[i].quantity;
			findGrandTotal = findGrandTotal + totalPennyPrice;
		}
		let finalGrandTotal = findGrandTotal * 100;
		setGrandTotal(finalGrandTotal.toFixed(2));
	}

	useEffect(() => {
		findGrandTotal();
	}, [cartData]);

	function removeItem(index) {
		//will need to write this function to send a patch request to the db and then re-render the cart
	}

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
					let priceInPennies = product.price / 100;
					let extendedTotalInPennies = priceInPennies * product.quantity;
					let totalExtendedPrice = extendedTotalInPennies * 100;

					return (
						<div className="cartCard" value={index}>
							<img
								src={product.image}
								alt="plant"
								height="200"
								width="200"
							></img>
							<h4 className="productName">{product.productName}</h4>
							<p className="productQty">Quantity: {product.quantity}</p>
							<p className="productPrice">
								Price: ${totalExtendedPrice.toFixed(2)}
							</p>
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
