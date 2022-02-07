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

export default notificationReducer