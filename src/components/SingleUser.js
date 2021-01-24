import React from "react";
import "./Users.css";
import { Avatar } from "@material-ui/core";

const Users = (props) => {
	const { activeUser } = props;
	return (
		<>
			<h1 className="productsHeader">Account</h1>
			<div className="user">
				<div id="modal" className="usersCard" key={activeUser.id}>
					<Avatar alt="avatar" src={activeUser.imageURL}>
						{activeUser.firstName.charAt(0) +
							" " +
							activeUser.lastName.charAt(0)}
					</Avatar>
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
