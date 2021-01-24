import React, { useState } from "react";
import "./SingleUserAdmin.css";
import { fetchAPI, BASE_URL } from "../api";

const SingleUserAdmin = (props) => {
	const { userToUpdate, activeUser, history, setUsersList } = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [username, setUsername] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	function backToAdminPortal() {
		history.push("/adminportal");
	}

	async function updateUserProfile(event) {
		event.preventDefault();

		const sendData = {
			userId: userToUpdate.id,
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			imageURL: imageURL,
			isAdmin: isAdmin,
		};

		console.log("the udpated user info being sent is", sendData);
		if (firstName && lastName && email && username && isAdmin) {
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
					setImageURL("");
					setIsAdmin(false);
				}

				const updatedUsersList = fetchAPI(BASE_URL + "/users");
				setUsersList(updatedUsersList);
			} catch (error) {
				setMessage(error);
			}
		} else {
			setMessage("Please fill in all fields to submit a new product");
		}
	}

	if (activeUser.isAdmin) {
		return (
			<>
				<button className="backToAdmin" onClick={backToAdminPortal}>
					Back to Admin Portal
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
						onChange={(event) => setUsername(event.target.value)}
					></input>
					<label>User Picture</label>
					<input
						type="text"
						placeholder="Enter imageURL - include https://www. at the beginning"
						value={imageURL}
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
						<option value="false">No, do not set as site administrator</option>
					</select>
					<button className="backToAdmin" onClick={updateUserProfile}>
						Submit Changes
					</button>
				</form>
			</>
		);
	} else {
		return <h1>You must be an administrator to access this page</h1>;
	}
};

export default SingleUserAdmin;
