import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

const Cart = (props) => {
	const { cartData, history } = props;

	return <SingleOrder cartData={cartData} history={history} />;
};

export default Cart;
