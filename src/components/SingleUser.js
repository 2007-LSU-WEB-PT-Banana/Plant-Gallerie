import React from "react";
import { Avatar } from "@material-ui/core";

const SingleUser = (props) => {
	const { activeUser } = props;

	let firstInitial = activeUser.firstName.substring(0, 1) || "J";
	let lastInitial = activeUser.lastName.substring(0, 1) || "D";

	return (
		<>
			<h1 className="productsHeader">Account Details</h1>
			<div className="user">
				<div id="modal" className="usersCard" key={activeUser.id}>
					{activeUser ? (
						<Avatar alt="avatar" src={activeUser.imageURL}>
							{firstInitial + " " + lastInitial}
						</Avatar>
					) : (
						""
					)}
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
