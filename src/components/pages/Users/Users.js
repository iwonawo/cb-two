import React from 'react'
import UsersList from '../../Users/UsersList'

const Users = props => {
  return (
    <section>
      <h1>Users List</h1>
      <UsersList
        users={props.users}
        onDelete={props.onDelete}
        onEditUser={props.onEditUser}
      />
    </section>
  )
}

export default Users
