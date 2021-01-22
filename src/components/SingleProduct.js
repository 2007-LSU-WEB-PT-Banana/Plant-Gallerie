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
		activeUser,
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

	let match = -1;
	match = cartData.findIndex((x) => x.id === activeProduct.id);

	async function authenticatedCartUpdate() {
		//if the current item matches anything in the cart, "match" will update to be the index of that item
		//in the cartData array
		if (match === -1) {
			try {
				let newCartItem = {
					productId: activeProduct.id,
					price: activeProduct.price,
					productName: activeProduct.name,
					quantity: count,
					id: activeProduct.id,
					image: activeProduct.imageURL,
				};

				const newCart = await fetchAPI(
					BASE_URL + "/orders/" + orderId + "/products",
					"POST",
					newCartItem
				);
				let total = 0;
				newCart.map((product) => {
					let newPrice = product.price / 100;
					product.price = newPrice;
					total = newPrice * product.quantity + total;
				});
				setCartData(newCart);
				setCount(1);
				setMessage("Added to Cart");
			} catch (error) {
				throw error;
			}
		} else {
			try {
				let updatedCount = count + cartData[match].quantity;
				let updatedCartItem = {
					productId: activeProduct.id,
					price: activeProduct.price,
					quantity: updatedCount,
				};
				const updatedCart = await fetchAPI(
					BASE_URL + "/order_products/" + orderId,
					"PATCH",
					updatedCartItem
				);
				console.log("the updated cart is", updatedCart);
				setCartData(updatedCart);
				setCount(1);
				setMessage("Updated Cart");
			} catch (error) {
				throw error;
			}
		}
	}

	async function visitorCartUpdate() {
		if (match === -1) {
			let newCartItem = {
				id: activeProduct.id,
				price: activeProduct.price,
				name: activeProduct.name,
				quantity: count,
				imageURL: activeProduct.imageURL,
			};
			setCartData([...cartData, newCartItem]);
			setCount(1);
			setMessage("Added to Cart");
		} else {
			let updatedCount = count + cartData[match].quantity;

			let updatedCartItem = {
				id: activeProduct.id,
				price: activeProduct.price,
				name: activeProduct.name,
				quantity: updatedCount,
				imageURL: activeProduct.imageURL,
			};

			let newCartData = cartData.slice();
			newCartData.splice(match, 1, updatedCartItem);
			setCartData(newCartData);
			setCount(1);
			setMessage("Updated Cart");
		}
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
					{activeUser ? (
						<button className="addToCart" onClick={authenticatedCartUpdate}>
							Add to Cart
						</button>
					) : (
						<button className="addToCart" onClick={visitorCartUpdate}>
							Add to Cart
						</button>
					)}
					<p className="addToCartMessage">{message}</p>
				</div>
			</div>
		</>
	);
};

export default SingleProduct;
