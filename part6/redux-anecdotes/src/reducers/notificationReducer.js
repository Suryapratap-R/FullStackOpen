const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notificationMessage
        default:
            return state
    }
}

export const notificationChanger = msg => ({
    type: 'SET_NOTIFICATION',
    notificationMessage: msg
})

export const setNotification = (message, seconds=3) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notificationMessage: message
        })
        setTimeout(() => dispatch({
            type: 'SET_NOTIFICATION',
            notificationMessage: null
        }),
            seconds*1000
        )
    }
}

export default notificationReducer