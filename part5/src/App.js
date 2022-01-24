import React, { useEffect, useState, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

const NotificationBanner = ({message, isError}) => {
  const color = isError ? 'Crimson' : 'green'
  return message!==null?(
    <div style={{ border: `4px solid ${color}`, borderRadius: '8px', padding: '10px', maxWidth: '700px', margin: '18px 0', color: color, backgroundColor: 'slategray' }}>
    {message}
    </div>
  ):null
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [blogs])

  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username<input name='username' onChange={handleUsernameChange} />
      </div>
      <div>
        Password<input name='password' type={'password'} onChange={handlePasswordChange} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
  const blogFormRef = useRef()
  
  const blogsList = () => (
    <>
    <h2>blogs</h2>
    {user.name} logged in
    <button onClick={() => {
      window.localStorage.removeItem('user')
      setUser(null)
    }}>logout</button>

    <Toggable showMessage='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Toggable>

    <div style={{ paddingTop: '20px' }}>

      {blogs.sort((a, b)=>b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={updateLike}/>
      )}
    </div>
    </>
  )

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userResponse = await loginService({
        username: username,
        password: password
      })
      setUser(userResponse)
      blogService.setToken(userResponse.token)
      window.localStorage.setItem('user', JSON.stringify(userResponse))
    } catch (error) {
      setIsError(true)
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const updateLike = async (id, blogObject) => {
    try {
      await blogService.updateById(id, blogObject)
    } catch (error) {
      setIsError(true)
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }



  const createBlog = async (blogObject) => {
    
    blogFormRef.current.toggleVisible()
    blogService.setToken(user.token)
    try {
      const res = await blogService.createNew(blogObject)
      setIsError(true)
      console.log(res);
      setNotificationMessage(`a new blog ${res.title} by ${res.author} added`)
      setIsError(false)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    } catch (error) {
      setNotificationMessage(error)
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
    
  }

    return <div style={{ margin: '0 Auto', maxWidth: '800px' }}>
      <NotificationBanner message={notificationMessage} isError={isError} />
      {user === null
        ? loginForm()
        : blogsList()}
    </div>
  }


export default App