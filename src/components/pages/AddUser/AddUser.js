import React from 'react'
import AddNewUser from '../../Users/AddNewUser'

const AddUserPage = props => {
  return (
    <section>
      <h1>Add New User</h1>
      <AddNewUser onAddUser={props.onAddUser} />
    </section>
  )
}

export default AddUserPage
