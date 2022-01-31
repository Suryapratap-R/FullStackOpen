import React, { useEffect, useState, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

const NotificationBanner = ({message, isError}) => {
  const color = isError ? 'Crimson' : 'green'
  return message!==null?(
    <div style={{ border: `4px solid ${color}`, borderRadius: '8px', padding: '10px', maxWidth: '700px', margin: '18px 0', color: color, backgroundColor: 'WhiteSmoke' }}>
    {message}
    </div>
  ):null
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username<input name='username' id='login-username' onChange={handleUsernameChange} />
      </div>
      <div>
        Password<input name='password' id='login-password' type={'password'} onChange={handlePasswordChange} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
  const blogFormRef = useRef()

  const deletePost = async (id) => {
    try {
      await blogService.deleteWithId(id)
      setBlogs(blogs.filter(blog=>blog.id !== id))
      
    } catch (error) {
      setNotificationMessage(error.message)
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }
  
  const blogsList = () => (
    <>
      <h2>blogs</h2>
      <span>
        {user.name} logged in 
      </span>
    <button onClick={() => {
      window.localStorage.removeItem('user')
      setUser(null)
      }}>
      logout
    </button>

    <Toggable showMessage='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Toggable>

    <div style={{ paddingTop: '20px' }}>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={updateLike} deletePost={deletePost}/>
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
      console.log('res',res);
      setBlogs(blogs.concat({
        title: res.title,
        author: res.author,
        url: res.url,
        likes: res.likes,
        user: res.user,
        id: res.id
      }))
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