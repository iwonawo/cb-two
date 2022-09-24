import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { faker } from '@faker-js/faker'

import Login from './components/pages/Login/Login'
import Home from './components/pages/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import AddUserPage from './components/pages/AddUser/AddUser'
import Users from './components/pages/Users/Users'
import EditModal from './components/Users/EditUser'

//initial dummy data from faker library
import USERS_DATA from './components/Users/USERS_DATA'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedEmail, setLoggedEmail] = useState('')
  const [usersList, setUsersList] = useState(USERS_DATA)
  const [editModal, setEditModal] = useState(false)
  const [getUserData, setGetUserData] = useState({})

  //redirect to home page after form submit
  const navigate = useNavigate()

  // login/logaout simulation
  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn')
    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setLoggedEmail(email)
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setLoggedEmail('')
    setIsLoggedIn(false)
  }

  //Add User
  //add new user to usersList array after submitting the AddUser form
  const addUserHandler = userData => {
    setUsersList(prevUsersList => {
      return [
        {
          id: Math.random().toString(),
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          avatar: faker.image.avatar()
        },
        ...prevUsersList
      ]
    })
    navigate('/users')
  }

  //Delete user based on current id
  const deleteHandler = id => {
    setUsersList(current =>
      current.filter(item => {
        return item.id !== id
      })
    )
  }

  //Edit User
  const getUserHandler = currentUserId => {
    //find object from users list with current id
    const currentUser = usersList.find(obj => {
      return obj.id === currentUserId
    })
    setGetUserData(currentUser)
    setEditModal(true)
  }

  const updateUserHandler = data => {
    setEditModal(false)

    const newState = usersList.map(obj => {
      // if id on the list equals updated user id, update list
      if (obj.id === getUserData.id) {
        return {
          ...obj,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName
        }
      }

      // otherwise return object as is
      return obj
    })

    setUsersList(newState)
  }

  //close modal
  const modalHandler = () => {
    setEditModal(false)
  }

  return (
    <React.Fragment>
      {editModal && (
        <EditModal
          onConfirm={modalHandler}
          userData={getUserData}
          onUpdateData={updateUserHandler}
        />
      )}
      <MainHeader
        isAuthenticated={isLoggedIn}
        onLogout={logoutHandler}
        loggedEmail={loggedEmail}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <Login onLogin={loginHandler} />
              ) : (
                <Home onLogout={logoutHandler} loggedEmail={loggedEmail} />
              )
            }
            exact
          ></Route>
          <Route
            path="/users"
            element={
              <Users
                users={usersList}
                onDelete={deleteHandler}
                onEditUser={getUserHandler}
              />
            }
            loggedEmail={loggedEmail}
            exact
          ></Route>
          <Route
            path="/add-user"
            element={<AddUserPage onAddUser={addUserHandler} />}
            loggedEmail={loggedEmail}
            exact
          ></Route>
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default App
