
import React from 'react'
import { connect } from 'react-redux'
// import { notificationChanger } from '../reducers/notificationReducer'

const Notification = (props) => {
  // const notification = useSelector(anecdotes => anecdotes.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === null) {
    return null
  } else {
    return (<div style={style}>
      {props.notification}
    </div>)
  }
}

const mapStateToProps = state => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification