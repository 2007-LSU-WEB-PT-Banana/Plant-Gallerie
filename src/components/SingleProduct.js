import React, { useState } from "react";

const SingleProduct = (props) => {
	const {
		activeProduct,
		setActiveProduct,
		history,
		count,
		setCount,
		cartData,
		setCartData,
	} = props;

	function cancelOption(event) {
		event.preventDefault();
		setActiveProduct("");
		history.goBack();
	}

	function incrementCount() {
		let newCount = count + 1;
		setCount(newCount);
	}

	function decrementCount() {
		let newCount = count - 1;
		setCount(newCount);
	}

	function updateCart() {
		let newCartItem = {
			productId: activeProduct.id,
			price: activeProduct.price,
			productName: activeProduct.name,
			quantity: count,
		};
		setCartData([...cartData, newCartItem]);
		setCount(1);
		setActiveProduct("");
		history.goBack();
	}

	return (
		<>
			<div className="singleProduct">
				<img
					src={activeProduct.imageURL}
					alt="plant"
					height="400"
					width="400"
				></img>
				<h2 className="singleProductName">{activeProduct.name}</h2>
				<p>{activeProduct.description}</p>
				<p>${activeProduct.price}</p>
				{activeProduct.inStock ? (
					<p>Currently in stock!</p>
				) : (
					<p>Currently on backorder</p>
				)}
				<div className="cartOptions">
					<div className="quantity buttons_added">
						<input
							type="button"
							value="-"
							className="minus"
							onClick={decrementCount}
						/>
						<input
							readOnly
							type="number"
							step="1"
							min="1"
							max=""
							name="quantity"
							value={count}
							title="Qty"
							className="input-text qty text"
							size="4"
							pattern=""
							inputMode=""
						/>
						<input
							type="button"
							value="+"
							className="plus"
							onClick={incrementCount}
						/>
					</div>
					<button className="addToCart" onClick={updateCart}>
						Add to Cart
					</button>
					<button className="cancel" onClick={cancelOption}>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
};

export default SingleProduct;
