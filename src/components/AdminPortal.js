import React from "react";
import { Link } from "react-router-dom";
import "./AdminPortal.css";

const AdminPortal = (props) => {
	const { activeUser } = props;

	if (activeUser.isAdmin) {
		return (
			<>
				<h1 className="productsHeader">Admin Portal</h1>
				<div className="adminWrapper">
					<Link to="/users" className="adminLink">
						Get All Users
					</Link>
					<Link to="/addnewproduct" className="adminLink">
						Add New Product
					</Link>
					<Link to="/deleteproduct" className="adminLink">
						Delete A Product
					</Link>
					<Link to="/updateproduct" className="adminLink">
						Update Product Details
					</Link>
					<Link to="/getordersbyproduct" className="adminLink">
						Get Orders By Product Number
					</Link>
					<Link to="/updateuser" className="adminLink">
						User Maintenance
					</Link>
				</div>
			</>
		);
	} else {
		return <h1>You must be an administrator to access this page</h1>;
	}
};

export default AdminPortal;
