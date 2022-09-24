import React from 'react'

import classes from './UserItem.module.css'

const UserItem = props => {
  return (
    <li key={props.id} className={classes.item}>
      <div className={classes.image}>
        <img src={props.avatar} alt={props.firstName} />
      </div>
      <div>
        <p>{props.email}</p>
        <p>
          <span>{props.firstName}</span>
          <span>{props.lastName}</span>
        </p>
      </div>
    </li>
  )
}

export default UserItem
