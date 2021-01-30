import React, { useState } from "react";

const AllProducts = (props) => {
	const { productList, history, setActiveProduct } = props;
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<>
			<div className="header-search">
				<input
					className="search-bar"
					id="keywords"
					type="text"
					placeholder="What are you looking for?"
					className="search"
					value={searchTerm}
					onChange={(event) => {
						setSearchTerm(event.target.value);
					}}
					style={{
						backgroundColor: "white",
						width: "97vw",
						outline: "none",
					}}
				/>
			</div>
			<h1 className="productsHeader">All Plants</h1>

			<div className="allProducts">
				{productList
					.filter(function (prod) {
						return prod.name.toLowerCase().includes(searchTerm.toLowerCase());
					})
					.map((product, index) => {
						return (
							<div
								className="productCard"
								id="modal"
								key={index}
								onClick={(event) => {
									event.preventDefault();
									setActiveProduct(product);
									history.push(`/products/${product.id}`);
								}}
							>
								<img
									src={product.imageURL}
									alt="plant"
									height="150"
									width="150"
								></img>
								<p className="productName">{product.name}</p>
								<p className="productPrice">${product.price}</p>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default AllProducts;
