import React from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import { Avatar } from "@material-ui/core";

const SingleUser = (props) => {
	const { activeUser } = props;

	return (
		<>
			<h1 className="productsHeader">Account</h1>
			<div className="user">
				<div id="modal" className="usersCard">
					{activeUser.imageURL !== "no picture" ? (
						<img
							alt="profile"
							className="userscard"
							src={activeUser.imageURL}
						/>
					) : (
						<Avatar alt="avatar" src={activeUser.imageURL}>
							{activeUser.firstName.charAt(0) +
								" " +
								activeUser.lastName.charAt(0)}
						</Avatar>
					)}
					<p>First Name: {activeUser.firstName}</p>
					<p>Last Name: {activeUser.lastName}</p>
					<p>Email: {activeUser.email}</p>
					<p>My Username: {activeUser.username}</p>
					<button>
						<Link to="/editmyinfo" className="backToAdmin">
							Edit Your Info
						</Link>
					</button>
				</div>
			</div>
		</>
	);
};

export default SingleUser;
