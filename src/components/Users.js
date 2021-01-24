import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import { Avatar } from "@material-ui/core";
const Users = (props) => {
	const { usersList, history, activeUser, setUserToUpdate } = props;

	function backToAdminPortal() {
		history.push("/adminportal");
	}

	if (activeUser.isAdmin) {
		return (
			<>
				<button className="backToAdmin" onClick={backToAdminPortal}>
					Back to Admin Portal
				</button>
				<h1 className="productsHeader">User Maintenance</h1>
				<div className="users">
					{usersList.map((users, index) => {
						const {
							id,
							firstName,
							lastName,
							email,
							imageURL,
							username,
							isAdmin,
						} = users;
						return (
							<div id="modal" className="usersCard" key={id} value={index}>
								<div>
									<Avatar alt="avatar" src={imageURL}>
										{firstName.charAt(0) + " " + lastName.charAt(0)}
									</Avatar>
								</div>
								<p>Id: {id}</p>
								<p
									className="usernameLink"
									onClick={(event) => {
										event.preventDefault();
										setUserToUpdate(usersList[index]);
										history.push(`/users/${id}`);
									}}
								>
									Username: {username}
								</p>
								<p>First Name: {firstName}</p>
								<p>Last Name: {lastName}</p>
								<p>Email: {email}</p>
								<p>Site Admin? {isAdmin ? "Yes" : "No"}</p>
								<button
									className="backToAdmin"
									onClick={(event) => {
										event.preventDefault();
										setUserToUpdate(usersList[index]);
										history.push(`/users/${id}`);
									}}
								>
									Update User Info
								</button>
							</div>
						);
					})}
				</div>
			</>
		);
	} else {
		return <h1>You must be an administrator to access this page</h1>;
	}
};

export default Users;
