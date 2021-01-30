import React from "react";
import SingleOrder from "./SingleOrder";

const Cart = (props) => {
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

	function continueShopping() {
		history.goBack();
	}

	return (
		<div>
			<h1 className="productsHeader">Order Detail</h1>

			<div className="orderOptions">
				<button onClick={continueShopping}>Continue Shopping</button>
				<button onClick={() => history.push("/payment")}>Checkout</button>
				<div
					className="orderTotal"
					style={{
						display: "inline-block",
						float: "right",
						marginRight: "25px",
						fontFamily: "Spinnaker, sans-serif",
						fontSize: "18px",
					}}
				>
					<h3>Cart Total</h3>
					<p>${grandTotal.toFixed(2)}</p>
				</div>
			</div>
			<SingleOrder
				history={history}
				cartData={cartData}
				setCartData={setCartData}
				isLoggedIn={isLoggedIn}
				grandTotal={grandTotal}
				setGrandTotal={setGrandTotal}
				orderId={orderId}
				activeUser={activeUser}
			/>
		</div>
	);
};

export default Cart;
