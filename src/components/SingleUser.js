import React from "react";
import "./Users.css";
import { Avatar } from "@material-ui/core";

const Users = (props) => {
	const {activeUser} = props;
	return (
		<>
			<h1 className="productsHeader">Account</h1>
			<div className="user">
				<div id="modal" className="usersCard" key={activeUser.id}>
					<img alt="profile-image" src={activeUser.imageURL}>
					</img>
					<p>First Name: {activeUser.firstName}</p>
					<p>Last Name: {activeUser.lastName}</p>
					<p>Email: {activeUser.email}</p>
					<p>My Username: {activeUser.username}</p>
					<p>{activeUser.isAdmin}</p>
				</div>
			</div>
		</>
	);
};

export default Users;
