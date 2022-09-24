import React, { useRef } from 'react'
import Card from '../UI/Card/Card'

import classes from './AddNewUser.module.css'

const AddNewUser = props => {
  const emailInputRef = useRef()
  const firstNameInputRef = useRef()
  const lastNameInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()

    //reading typed field value
    const enteredEmail = emailInputRef.current.value
    const enteredFirstName = firstNameInputRef.current.value
    const enteredLastName = lastNameInputRef.current.value

    //create object to store data from the form
    const userData = {
      email: enteredEmail,
      firstName: enteredFirstName,
      lastName: enteredLastName
    }

    //passing form data as a prop for onAddUser in App component
    props.onAddUser(userData)
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="firstName">first name</label>
          <input type="text" id="firstName" required ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">last name</label>
          <input type="text" id="lastName" required ref={lastNameInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add User</button>
        </div>
      </form>
    </Card>
  )
}

export default AddNewUser
