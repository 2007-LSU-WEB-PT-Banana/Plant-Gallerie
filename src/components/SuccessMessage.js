import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import './Success.css'

function SuccessMessage(props) {
  const { activeUser, history } = props
  return (
    <div className="success-modal">
      <div className="success-container">
        <ClearIcon
          style={{ marginLeft: '550px' }}
          onClick={() => history.push('/')}
        />
        <h2>PLANT GALLERIE ORDER CONFIRMATION</h2>
        <p>
          {activeUser ? <span> {activeUser.firstName}</span> : null}
          Thank You For Placing order with Us!!!
        </p>
        <p>Please Check your email for Necessary details.</p>
        <p>We will send you tracking details once your order ships.</p>
      </div>
    </div>
  )
}

export default SuccessMessage
