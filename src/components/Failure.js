import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'

export default function Failure(props) {
  const { activeUser, history } = props
  return (
    <div className="success-modal">
      <div className="success-container">
        <ClearIcon
          style={{ marginLeft: '550px' }}
          onClick={() => history.push('/')}
        />
        <h2 style={{ color: 'red' }}>Something went wrong!!</h2>
        <p>
          {activeUser ? (
            <span style={{ color: 'green' }}> {activeUser.firstName} </span>
          ) : null}
          Try placing order again with Us.
        </p>
        <p>If any Question Please reach out to us</p>
        <p>We would be happy to help</p>
      </div>
    </div>
  )
}
