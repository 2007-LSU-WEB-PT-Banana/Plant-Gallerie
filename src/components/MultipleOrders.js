import React, { useState, useEffect } from "react";
import { fetchAPI, BASE_URL } from "../api";
import "./MultipleOrders.css";

const MultipleOrders = (props) => {
	const { activeUser, history } = props;

	const [orderList, setOrderList] = useState([]);
	const [filterTerm, setFilterTerm] = useState("");

	useEffect(() => {
		fetchAPI(BASE_URL + "/orders")
			.then((data) => {
				setOrderList(data);
			})
			.catch(console.error);
	}, []);

	function backToAdminPortal() {
		history.push("/adminportal");
	}

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}
	return (
		<>
			{activeUser.isAdmin ? (
				<>
					<button className="backToAdmin" onClick={backToAdminPortal}>
						Back to Admin Portal
					</button>
					<input
						id="keywords"
						type="text"
						placeholder="Search on Order Id, User Id, or Order Status"
						className="search"
						value={filterTerm}
						onChange={(event) => {
							setFilterTerm(event.target.value);
						}}
					/>
					<button className="backToAdmin" onClick={() => setFilterTerm("")}>
						RESET FILTER
					</button>
					<h1>All Orders</h1>
					<div className="allOrders">
						{orderList
							.filter(function (order) {
								return (
									order.id.toLowerCase().includes(filterTerm.toLowerCase()) ||
									order.userId
										.toLowerCase()
										.includes(filterTerm.toLowerCase()) ||
									order.status.toLowerCase().includes(filterTerm.toLowerCase())
								);
							})
							.map((order, index) => {
								return (
									<div className="orderCard" id="modal" key={index}>
										<h4 className="orderId">Order: {order.id}</h4>
										<p>Date Placed: {formatDate(order.datePlaced)}</p>
										<p>Order Status: {order.status}</p>
										<p className="orderedBy">Ordered by User: {order.userId}</p>
										<h5>Products:</h5>
										{order.products.map((product) => {
											return (
												<>
													<div className="orderProducts">
														<p className="productInfo">
															Id: {product.productId}
														</p>
														<p className="productInfo">
															Price: ${product.price / 100}
														</p>
														<p className="productInfo">
															Quantity: {product.quantity}
														</p>
													</div>
												</>
											);
										})}
									</div>
								);
							})}
					</div>
				</>
			) : (
				<>
					<div className="adminError">
						<h1>You must be an administrator to access this page</h1>
					</div>
				</>
			)}
		</>
	);
};

export default MultipleOrders;
