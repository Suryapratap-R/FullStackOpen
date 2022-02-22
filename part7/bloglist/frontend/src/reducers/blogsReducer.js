import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL":
      return action.data;
    case "CREATE_BLOG":
      return state.concat(action.data)
    case "UPDATE_LIKE":
      return state
          .map((blog) =>
            blog.id === action.data.id
              ? { ...blog, likes: blog.likes + 1 }
              : blog
          )
          .sort((a, b) => parseInt(b.likes) - parseInt(a.likes))
    case "DELETE_POST":
      return state.filter((blog) => blog.id !== action.data.id)

    default:
      return state;
  }
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort(
      (a, b) => parseInt(b.likes) - parseInt(a.likes)
    );
    dispatch({
      type: 'GET_ALL',
      data: sortedBlogs
    });
  };
};

export const deleteBlogPost = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteWithId(id);
      dispatch({
        type: 'DELETE_POST',
        data: {
          id: id
        }
      });
    } catch (error){
      dispatch(setNotification("you are not authorized to delete this note", true))
    }
  }
}

export const likeBlogPost = (id, likes) => {
  return async dispatch => {
    await blogService.addLikes(id, likes);
    dispatch({
      type: 'UPDATE_LIKE',
      data: {
        id: id
      }
    });
  }
}

export default blogsReducer;
