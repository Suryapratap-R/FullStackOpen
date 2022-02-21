const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL":
      return action.data
    // case "CREATE_BLOG":
    //     break;
    // case "UPDATE_LIKE":
    //     break;
    // case "DELETE_POST":
    //     break;
    
    default:
      return state
  }
};

const getAll =  () => {
    return async dispatch => {
      
    };
}