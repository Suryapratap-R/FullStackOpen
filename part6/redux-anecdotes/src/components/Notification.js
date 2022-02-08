
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChanger } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(anecdotes => anecdotes.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  } else {
    return (<div style={style}>
      {notification}
    </div>)
  }

}

export default Notification