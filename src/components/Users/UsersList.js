import React, { useState } from 'react'
import Card from '../UI/Card/Card'
import UserItem from './UserItem'

import classes from './UsersList.module.css'

const UsersList = props => {
  const [currentPage, setCurrentPage] = useState(1)

  const usersPerPage = 3

  const handleClick = event => {
    setCurrentPage(Number(event.target.id))
  }

  // Logic for displaying todos
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const renderedUsers = props.users.slice(indexOfFirstUser, indexOfLastUser)

  // Logic for displaying page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(props.users.length / usersPerPage); i++) {
    pageNumbers.push(i)
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    )
  })

  const deleteHandler = event => {
    //lifting up
    const currentId = event.target.id
    props.onDelete(currentId)
  }
  const editHandler = event => {
    //lifting up
    const currentId = event.target.id
    props.onEditUser(currentId)
  }

  return (
    <>
      <Card>
        <ul>
          {renderedUsers.map(user => (
            <div key={user.id} className={classes.wrapper}>
              <UserItem
                email={user.email}
                firstName={user.first_name}
                lastName={user.last_name}
                avatar={user.avatar}
              />
              <div className={classes.actions}>
                <button onClick={deleteHandler} id={user.id}>
                  Delete
                </button>
                <button
                  className={classes.edit}
                  onClick={editHandler}
                  id={user.id}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </ul>
      </Card>
      <ul id="page-numbers" className={classes.pagination}>
        {renderPageNumbers}
      </ul>
    </>
  )
}

export default UsersList
