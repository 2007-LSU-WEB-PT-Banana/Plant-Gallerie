import React from "react";

const HousePlants = (props) => {
	const { productList, setActiveProduct, history } = props;

	return (
		<>
			<h1 className="productsHeader">House Plants</h1>
			<div className="allProducts">
				{productList.map((product, index) => {
					if (product.category === "HousePlant") {
						return (
							<div
								className="productCard"
								id="modal"
								key={index}
								onClick={(event) => {
									event.preventDefault();
									setActiveProduct(product);
									history.push("/products/:productId");
								}}
							>
								<img
									src={product.imageURL}
									alt="house plant"
									height="150"
									width="150"
								></img>
								<p className="productName">{product.name}</p>
								<p className="productPrice">${product.price}</p>
							</div>
						);
					} else {
						return "";
					}
				})}
			</div>
		</>
	);
};

export default HousePlants;
