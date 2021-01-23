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

	return (
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
	);
};

export default Cart
