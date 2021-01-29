import React, { useState } from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";
import { toast } from "react-toastify";
import SingleOrder from "./SingleOrder";
import "./Payment.css";
import SingleUser from "./SingleUser";

toast.configure();

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
	} = props;

	const { firstName, lastName, email } = activeUser;

	const completeOrder = async () => {
		try {
			if (activeUser) {
				const complete = await axios.get(`/api/orders/checkout/${orderId}`);
			} else {
				const body = {
					status: "created",
					products: cartData,
				};

				const newOrdr = await axios.post(`/api/orders`, body);

				await axios.get(`/api/orders/checkout/${newOrdr.data[0].orderId}`);
			}

			setCartData([]);
			if (localStorage.getItem("cartData")) {
				localStorage.removeItem("cartData");
			}

			history.push("/success");
		} catch (error) {
			throw error;
		}
	};

	const cancelOrder = async () => {
		const cancel = await axios.delete(`/api/orders/${orderId}`);
		setCartData([]);
		alert("your order has been cancelled");
		localStorage.removeItem("cartData");
		history.push("/");
	};

	async function handleToken(token) {
		try {
			const url = "api/payment";
			const result = await axios.post(url, {
				token,
				grandTotal,
			});

			const { status } = result.data;

			if (status == "success") {
				completeOrder();
			} else {
				toast("something went wrong", { type: "error" });
			}
		} catch (error) {
			throw error;
		}
	}

	return (
		<div className="stripe-header">
			<div className="useradress">
				<h2> Please review your order</h2>
				<h3>Shipping address:</h3>
				<h3>
					{activeUser.firstName} {activeUser.lastName}
				</h3>
				<span>{activeUser.email}</span>
				<p>112 Leo Road Hollywood CA 12345</p>
			</div>

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
				amount={parseInt(grandTotal * 100)}
			>
				<button className="button-pay">Complete your transaction</button>
			</StripeCheckout>
			<button onClick={cancelOrder} className="button-pay">
				Cancel Order
			</button>
		</div>
	);
}

export default Payment;
