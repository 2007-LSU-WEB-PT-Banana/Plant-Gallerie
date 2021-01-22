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
	} = props;

	return (
		<SingleOrder
			cartData={cartData}
			history={history}
			setCartData={setCartData}
			isLoggedIn={isLoggedIn}
			grandTotal={grandTotal}
			setGrandTotal={setGrandTotal}
		/>
	);
};

export default Cart;
