import React, { useState } from "react";
import { BASE_URL, fetchAPI } from "../api";

const SingleProduct = (props) => {
	const {
		activeProduct,
		setActiveProduct,
		history,
		count,
		setCount,
		cartData,
		setCartData,
		orderId,
	} = props;

	//deCha will rework the "add to Cart" function so that it sends the cartData to the database for authenticated users
	const [message, setMessage] = useState("");
	const [itemToUpdate, setItemToUpdate] = useState(false);

	console.log("the active product is", activeProduct);

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

	async function updateCart() {
		//write function - if the product does not appear in the cart already, make fetch request to post item to the order and
		// re-render the cart

		try {
			let newCartItem = {
				productId: activeProduct.id,
				price: activeProduct.price,
				productName: activeProduct.name,
				quantity: count,
				id: activeProduct.id,
				image: activeProduct.imageURL,
			};
			//need to know the order number to attach to here
			const newCart = await fetchAPI(
				BASE_URL + "/orders/" + orderId + "/products",
				"POST",
				newCartItem
			);
			console.log("the newCart info is", newCart);
			setCartData(newCart);
		} catch (error) {
			throw error;
		}
		//going to need to do a fetch here to post the new cart item to the order
		// let newInfo = {changed: false};
		// cartData.map((product, idx) => {
		//   if (product.id === activeProduct.id) {
		//     newInfo = {changed: true, index: idx, newQuantity: count + product.quantity, newPrice: activeProduct.price}
		//   }
		//   return newInfo;
		// })
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
