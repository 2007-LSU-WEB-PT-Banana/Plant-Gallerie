import React, { useState, useEffect } from "react";

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

	const [message, setMessage] = useState("");

	function backToSearch(event) {
		event.preventDefault();
		setActiveProduct("");
		setMessage("");
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
			price: activeProduct.price,
			productName: activeProduct.name,
			quantity: count,
			id: activeProduct.id,
			image: activeProduct.imageURL,
		};

		setCartData([...cartData, newCartItem]);
		setCount(1);
		setMessage("Added to Cart");
	}

	return (
		<>
			<button className="backButton" onClick={backToSearch}>
				Back to Search
			</button>
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
					<p className="addToCartMessage">{message}</p>
				</div>
			</div>
		</>
	);
};

export default SingleProduct;
