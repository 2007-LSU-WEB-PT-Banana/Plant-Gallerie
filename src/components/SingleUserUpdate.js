import React, { useState, useEffect } from 'react'
import './SingleUserAdmin.css'
import { fetchAPI, BASE_URL } from '../api'

const SingleUserUpdate = (props) => {
  const { activeUser, history, setUsersList, setActiveUser } = props

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setFirstName(activeUser.firstName || '')
    setLastName(activeUser.lastName || '')
    setUsername(activeUser.username || '')
    setEmail(activeUser.email || '')
    setImageURL(activeUser.imageURL || 'no picture')
    setIsAdmin(activeUser.isAdmin || false)
  }, [activeUser])

  function cancelChanges() {
    history.goBack()
  }

  async function updateMyProfile(event) {
    event.preventDefault()

    const sendData = {
      adminId: activeUser.id,
      id: activeUser.id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      isAdmin: isAdmin,
      imageURL: imageURL,
    }

    if (firstName && lastName && email && username) {
      try {
        const updatedUser = await fetchAPI(
          BASE_URL + '/users/' + activeUser.id,
          'PATCH',
          sendData,
        )
        if (updatedUser.id) {
          setMessage('Successfully updated')
          setFirstName('')
          setLastName('')
          setEmail('')
          setUsername('')
          setIsAdmin(false)
          setImageURL('no picture')
          setActiveUser(updatedUser)
        }

        const updatedUsersList = await fetchAPI(BASE_URL + '/users')
        setUsersList(updatedUsersList)
      } catch (error) {
        setMessage(error)
      }
    } else {
      setMessage('Please fill in all fields to submit changes')
    }
  }

  return (
    <>
      {activeUser ? (
        <>
          <button className="backToAdmin" onClick={cancelChanges}>
            Back
          </button>
          <h1 className="updateUserProfile">Update User Profile</h1>
          <h5 className="updateUserMessage">{message}</h5>
          <div className="formContainer">
            <form className="updateUserForm" id="updateUserForm">
              <label>First Name</label>
              <input
                type="text"
                placeholder={activeUser.firstName}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              ></input>
              <label>Last Name</label>
              <input
                type="text"
                placeholder={activeUser.lastName}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              ></input>
              <label>Username</label>
              <input
                type="text"
                placeholder={activeUser.username}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
              <label>Email Address</label>
              <input
                type="text"
                placeholder={activeUser.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
              <label>Profile Picture</label>
              <input
                type="text"
                placeholder="Enter link to your photo - include https://www. at the beginning"
                value={imageURL}
                onChange={(event) => setImageURL(event.target.value)}
              ></input>
              <button className="backToAdmin" onClick={updateMyProfile}>
                Submit Changes
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="adminError">
            <h1>You must be the owner of this account to make changes</h1>;
          </div>
        </>
      )}
    </>
  )
}

export default SingleUserUpdate
