import React, { useState } from "react";
import "./AddProduct.css";
import { fetchAPI, BASE_URL } from "../api";

const AddProduct = (props) => {
	const { activeUser, history, setProductList, modal, setModal } = props;

	const [plantCategory, setPlantCategory] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [inStock, setInStock] = useState("");
	const [message, setMessage] = useState("");

	function backToAdminPortal() {
		history.push("/adminportal");
	}

	async function submitNewProduct(event) {
		event.preventDefault();

		const sendData = {
			category: plantCategory,
			price: price,
			inStock: inStock,
			description: description,
			imageURL: imageURL,
			name: name,
		};

		if (plantCategory && name && price && description && imageURL && inStock) {
			try {
				const newProduct = await fetchAPI(
					BASE_URL + "/createproduct",
					"POST",
					sendData
				);
				if (newProduct.id) {
					setMessage("Successfully added");
					setPlantCategory("");
					setName("");
					setDescription("");
					setPrice("");
					setImageURL("");
					setInStock(true);
				}

				const data = await fetchAPI(BASE_URL + "/products");
				data.map((product) => {
					let newPrice = product.price / 100;
					product.price = newPrice;
				});
				setProductList(data);
			} catch (error) {
				setMessage(error);
			}
		} else {
			setMessage("Please fill in all fields to submit a new product");
		}
	}

	if (activeUser.isAdmin) {
		return (
			<>
				<button className="backToAdmin" onClick={backToAdminPortal}>
					Back to Admin Portal
				</button>
				<h1 className="productsHeader">Add New Product Form</h1>
				<h5 className="addProductMessage">{message}</h5>
				<form className="addProductForm" id="productForm">
					<select
						id="plantCategory"
						name="plantCategory"
						value={plantCategory}
						onChange={(event) => setPlantCategory(event.target.value)}
					>
						<option>Choose Category</option>
						<option value="HousePlant">House Plant</option>
						<option value="Bonsai">Bonsai/Bamboo</option>
						<option value="Flowering">Flowering</option>
					</select>
					<input
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					></input>
					<input
						type="number"
						step="0.01"
						placeholder="Enter price"
						value={price}
						onChange={(event) => setPrice(event.target.value)}
					></input>
					<textarea
						rows="10"
						className="description"
						placeholder="Enter description"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					></textarea>
					<input
						type="text"
						placeholder="Enter imageURL - include https://www. at the beginning"
						value={imageURL}
						onChange={(event) => setImageURL(event.target.value)}
					></input>
					<select
						id="inStock"
						name="inStock"
						value={inStock}
						onChange={(event) => setInStock(event.target.value)}
					>
						<option>In Stock or On Backorder?</option>
						<option value="true">Currently In Stock</option>
						<option value="false">On Backorder</option>
					</select>
					<button className="backToAdmin" onClick={submitNewProduct}>
						Submit New Product
					</button>
				</form>
			</>
		);
	} else {
		return <h1>You must be an administrator to access this page</h1>;
	}
};

export default AddProduct;
