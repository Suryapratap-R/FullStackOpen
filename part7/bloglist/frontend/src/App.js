import React, { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from "./reducers/notificationReducer";
import NotificationBanner from "./components/Notification";
import { getAllBlogs } from "./reducers/blogsReducer";



const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch()
  const blogs = useSelector((data) => data.blogs)
  console.log(blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    dispatch(getAllBlogs())
  }, []);


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          name="username"
          id="login-username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password
        <input
          name="password"
          id="login-password"
          type={"password"}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
  const blogFormRef = useRef();


  const blogsList = () => (
    <>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button
        onClick={() => {
          window.localStorage.removeItem("user");
          setUser(null);
        }}
      >
        logout
      </button>

      <Toggable showMessage="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggable>

      <div style={{ paddingTop: "20px" }}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={updateLike}
          />
        ))}
      </div>
    </>
  );

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userResponse = await loginService({
        username: username,
        password: password,
      });
      setUser(userResponse);
      blogService.setToken(userResponse.token);
      window.localStorage.setItem("user", JSON.stringify(userResponse));
    } catch (error) {
      dispatch(setNotification("wrong username or password", true));
    }
  };

  const updateLike = async (id, blogObject) => {
    try {
      await blogService.updateById(id, blogObject);
      // const updateBlogLike = blogs.map((blog) =>
      //   blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      // );
      // const sortUpdateLike = updateBlogLike.sort(
      //   (a, b) => parseInt(b.likes) - parseInt(a.likes)
      // );

      // setBlogs(sortUpdateLike);
    } catch (error) {
      dispatch(setNotification("wrong username or password", true));
      
    }
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisible();
    blogService.setToken(user.token);
    try {
      const res = await blogService.createNew(blogObject);
      // setBlogs(
      //   blogs.concat({
      //     title: res.title,
      //     author: res.author,
      //     url: res.url,
      //     likes: res.likes,
      //     user: res.user,
      //     id: res.id,
      //   })
      // );
     await dispatch(
        setNotification(`a new blog ${res.title} by ${res.author} added`, false)
      );
    } catch (error) {
      dispatch(setNotification(error, true));
    }
  };

  return (
    <div style={{ margin: "0 Auto", maxWidth: "800px" }}>
      <NotificationBanner/>
      {user === null ? loginForm() : blogsList()}
    </div>
  );
};

export default App;
