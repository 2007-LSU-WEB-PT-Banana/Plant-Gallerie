import React, { useState } from "react";
import "./Users.css";
import { Avatar } from "@material-ui/core";
const Users = (props) => {
	const { usersList, history, activeUser, setUserToUpdate } = props;

	const [filterTerm, setFilterTerm] = useState("");

	function backToAdminPortal() {
		history.push("/adminportal");
	}

	function addNewUser() {
		history.push("/users/add");
	}

	return (
		<>
			{activeUser.isAdmin ? (
				<>
					<button className="backToAdmin" onClick={backToAdminPortal}>
						Back to Admin Portal
					</button>
					<button className="backToAdmin" onClick={addNewUser}>
						Add New User
					</button>
					<input
						id="keywords"
						type="text"
						placeholder="Search User Id or Username"
						className="search"
						value={filterTerm}
						onChange={(event) => {
							setFilterTerm(event.target.value);
						}}
					/>
					<button className="backToAdmin" onClick={() => setFilterTerm("")}>
						RESET FILTER
					</button>
					<h1 className="productsHeader">User Maintenance</h1>
					<div className="users">
						{usersList
							.filter(function (user) {
								return (
									user.id.toLowerCase().includes(filterTerm.toLowerCase()) ||
									user.firstName
										.toLowerCase()
										.includes(filterTerm.toLowerCase()) ||
									user.lastName.toLowerCase().includes(filterTerm.toLowerCase())
								);
							})
							.map((users, index) => {
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
									<div className="usersCard">
										{imageURL !== "no picture" ? (
											<img
												alt="profile-image"
												className="users"
												src={imageURL}
											/>
										) : (
											<Avatar alt="avatar" src={imageURL}>
												{firstName.charAt(0) + " " + lastName.charAt(0)}
											</Avatar>
										)}
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

export default Users;
