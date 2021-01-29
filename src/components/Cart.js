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
			<h1>Order Detail</h1>

			<div className="orderOptions">
				<button onClick={continueShopping}>Continue Shopping</button>
				<button onClick={() => history.push("/payment")}>Checkout</button>
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
