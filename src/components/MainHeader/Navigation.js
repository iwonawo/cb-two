import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import classes from './Navigation.module.css'

const Navigation = props => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link to="/users">Users</Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link to="/add-user">Add User</Link>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <NavLink to="/" onClick={props.onLogout} className={classes.button}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
