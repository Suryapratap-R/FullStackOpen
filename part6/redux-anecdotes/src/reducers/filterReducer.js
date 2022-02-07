const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            if (!action.filter) {
                return ''
            }
            return action.filter
        default:
            return state
    }
}

export const filterChange = filter => ({
    type: 'SET_FILTER',
    filter
})

export default filterReducer