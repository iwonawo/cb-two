import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Card from '../UI/Card/Card'
import classes from './EditUser.module.css'

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = props => {
  const [email, setEmail] = useState(props.userData.email)
  const [firstName, setFirstName] = useState(props.userData.first_name)
  const [lastName, setLastName] = useState(props.userData.last_name)

  const submitHandler = e => {
    e.preventDefault()
    //reading typed field value
    const newEmail = email
    const newFirstName = firstName
    const newLastName = lastName

    //create object to store data from the form
    const updateData = {
      email: newEmail,
      firstName: newFirstName,
      lastName: newLastName
    }

    //passing new form data as a prop for onUpdateData in App component
    props.onUpdateData(updateData)
  }

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>Edit User</h2>
      </header>
      <div className={classes.content}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="firstName">first name</label>
            <input
              type="text"
              id="firstName"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="lastName">last name</label>
            <input
              type="text"
              id="lastName"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <footer className={classes.actions}>
            <button>Save Changes</button>
          </footer>
        </form>
      </div>
    </Card>
  )
}

const EditModal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          userData={props.userData}
          onConfirm={props.onConfirm}
          onUpdateData={props.onUpdateData}
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  )
}

export default EditModal
