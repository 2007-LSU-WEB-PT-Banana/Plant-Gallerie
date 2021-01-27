import React, { useState, useEffect } from "react";
import "./SingleUserAdmin.css";
import { fetchAPI, BASE_URL } from "../api";

const SingleUserAdmin = (props) => {
	const { userToUpdate, activeUser, history, setUsersList } = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		setFirstName(userToUpdate.firstName || "");
		setLastName(userToUpdate.lastName || "");
		setUsername(userToUpdate.username || "");
		setIsAdmin(userToUpdate.isAdmin || false);
		setEmail(userToUpdate.email || "");
	}, []);

	function backToAdminPortal() {
		history.push("/users");
	}

	async function updateUserProfile(event) {
		event.preventDefault();

		const sendData = {
			adminId: activeUser.id,
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			isAdmin: isAdmin,
		};

		if (firstName && lastName && email && username) {
			try {
				const updatedUser = await fetchAPI(
					BASE_URL + "/users/" + userToUpdate.id,
					"PATCH",
					sendData
				);
				if (updatedUser.id) {
					setMessage("Successfully updated");
					setFirstName("");
					setLastName("");
					setEmail("");
					setUsername("");
					setIsAdmin(false);
				}

				const updatedUsersList = await fetchAPI(BASE_URL + "/users");
				setUsersList(updatedUsersList);
			} catch (error) {
				setMessage(error);
			}
		} else {
			setMessage("Please fill in all fields to submit a new product");
		}
	}

	return (
		<>
			{activeUser.isAdmin ? (
				<>
					<button className="backToAdmin" onClick={backToAdminPortal}>
						Back to Users
					</button>
					<h1 className="updateUserProfile">Update User Profile</h1>
					<h5 className="updateUserMessage">{message}</h5>
					<form className="updateUserForm" id="updateUserForm">
						<label>First Name</label>
						<input
							type="text"
							placeholder={userToUpdate.firstName}
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						></input>
						<label>Last Name</label>
						<input
							type="text"
							placeholder={userToUpdate.lastName}
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						></input>
						<label>Username</label>
						<input
							type="text"
							placeholder={userToUpdate.username}
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						></input>
						<label>Email Address</label>
						<input
							type="text"
							placeholder={userToUpdate.email}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						></input>

						<label>Set User as Site Administrator?</label>
						<select
							id="isAdmin"
							name="isAdmin"
							value={isAdmin}
							onChange={(event) => setIsAdmin(event.target.value)}
						>
							<option value="true">Yes, set as site administrator</option>
							<option value="false">
								No, do not set as site administrator
							</option>
						</select>
						<button className="backToAdmin" onClick={updateUserProfile}>
							Submit Changes
						</button>
					</form>
				</>
			) : (
				<>
					<div className="adminError">
						<h1>You must be an administrator to access this page</h1>;
					</div>
				</>
			)}
		</>
	);
};

export default SingleUserAdmin;
