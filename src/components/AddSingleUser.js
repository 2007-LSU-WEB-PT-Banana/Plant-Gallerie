import React, { useState } from "react";
// import "./SingleUserAdmin.css";
import { fetchAPI, BASE_URL } from "../api";

const AddSingleUser = (props) => {
	const { activeUser, history, setUsersList } = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	function backToUsers() {
		history.push("/users");
	}

	async function addNewUser(event) {
		event.preventDefault();

		const sendData = {
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			isAdmin: isAdmin,
			password: password,
			imageURL: "text",
		};

		if (firstName && lastName && email && username && password) {
			try {
				const updatedUser = await fetchAPI(
					BASE_URL + "/register",
					"POST",
					sendData
				);
				if (updatedUser.user.id) {
					setMessage("Successfully added");
					setFirstName("");
					setLastName("");
					setEmail("");
					setUsername("");
					setPassword("");
					setIsAdmin(false);
				}

				const updatedUsersList = await fetchAPI(BASE_URL + "/users");
				setUsersList(updatedUsersList);
			} catch (error) {
				setMessage(error);
			}
		} else {
			setMessage("Please fill in all fields to add a new user");
		}
	}

	return (
		<>
			{activeUser.isAdmin ? (
				<>
					<button className="backToAdmin" onClick={backToUsers}>
						Back to All Users
					</button>
					<h1 className="updateUserProfile">Add New User</h1>
					<h5 className="updateUserMessage">{message}</h5>
					<form className="updateUserForm" id="updateUserForm">
						<label>First Name</label>
						<input
							type="text"
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						></input>
						<label>Last Name</label>
						<input
							type="text"
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						></input>
						<label>Username</label>
						<input
							type="text"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						></input>
						<label>Password</label>
						<input
							type="text"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						></input>
						<label>Email Address</label>
						<input
							type="text"
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
						<button className="backToAdmin" onClick={addNewUser}>
							Add New User
						</button>
					</form>
				</>
			) : (
				<h1>You must be an administrator to access this page</h1>
			)}
		</>
	);
};

export default AddSingleUser;
