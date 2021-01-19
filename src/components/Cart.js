import React, { useEffect, useState } from "react";

const Cart = (props) => {
	const { cartData } = props;

	const [grandTotal, setGrandTotal] = useState(0);

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

	return (
		<div>
			<h1>Shopping Cart</h1>

			<div className="orderOptions">
				<button>Continue Shopping</button>
				<button>Checkout</button>
			</div>

			<div style={{ display: "inline-block", float: "right" }}>
				<h3>Order Total</h3>
				<p>${grandTotal}</p>
			</div>

			{cartData.map((product) => {
				let priceInPennies = product.price / 100;
				let extendedTotalInPennies = priceInPennies * product.quantity;
				let totalExtendedPrice = extendedTotalInPennies * 100;

				return (
					<div className="cartCard">
						<img src={product.image} alt="plant" height="200" width="200"></img>
						<p className="productName">{product.productName}</p>
						<p className="productQty">Quantity: {product.quantity}</p>
						<p className="productPrice">Price: ${totalExtendedPrice}</p>
						<button className="updateQty">Update Quantity</button>
						<button className="removeItem">Remove Item</button>
					</div>
				);
			})}
		</div>
	);
};

export default Cart;
