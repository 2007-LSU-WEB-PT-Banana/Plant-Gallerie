import React from "react";
import "./Users.css";
import { Avatar } from "@material-ui/core";

<<<<<<< HEAD
const Users = (props) => {
	const { activeUser } = props;
=======
const SingleUser = (props) => {
	const {activeUser} = props;
>>>>>>> dev
	return (
		<>
			<h1 className="productsHeader">Account</h1>
			<div className="user">
				<div id="modal" className="usersCard" key={activeUser.id}>
<<<<<<< HEAD
					<Avatar alt="avatar" src={activeUser.imageURL}>
						{activeUser.firstName.charAt(0) +
							" " +
							activeUser.lastName.charAt(0)}
					</Avatar>
=======
					{activeUser.imageURL ? (
						<img alt="profile-image" className="userscard" src={activeUser.imageURL} />
					) : (
						<Avatar alt="avatar" src={activeUser.imageURL}>
							{activeUser.firstName.charAt(0) + " " + activeUser.lastName.charAt(0)}
						</Avatar>
					)}
>>>>>>> dev
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

export default SingleUser;
