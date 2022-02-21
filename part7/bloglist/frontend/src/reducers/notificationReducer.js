let timeoutId = null;

const notificationReducer = ( state = {
        message: null,
        isError: false
  }, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
          return {
            message: action.data.message,
            isError: action.data.isError,
          };
    default:
      return state;
  }
};

export const setNotification = (message, isError) => {
  return async (dispatch) => {
    clearTimeout(timeoutId);
    dispatch({
      type: "SET_MESSAGE",
      data: {
        message,
        isError
      },
    });

    timeoutId = setTimeout(() => {
        dispatch({
          type: "SET_MESSAGE",
          data: {
            message: null,
            isError: false,
          },
        });
    }, 5000);
  };
};

export default notificationReducer;
