import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const NotificationBanner = ({message, isError}) => 
{
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
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
            <div>
              Username<input name='username' onChange={handleUsernameChange}/>
            </div>
            <div>
              Password<input name='password' type={'password'} onChange={handlePasswordChange}/>
            </div>
            <button type='submit'>Login</button>
      </form>
  )
  
  const blogsList = () =>
   ( <>
      <h2>blogs</h2>
    {user.name} logged in 
    <button onClick={() => {
      window.localStorage.removeItem('user')
      setUser(null)
    }}>logout</button>

    <h2>create new</h2>
    <form onSubmit={handleCreateNew}>
      <div>
      title:<input value={title} onChange={handleTitleChange}/>
      </div>
      <div>
      author:<input value={author} onChange={handleAuthorChange}/>
      </div>
      <div>
      url:<input value={url} onChange={handleUrlChange}/>
      </div>
      <button type='submit'>create</button>
    </form>
    <div style={{paddingTop: '20px'}}>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
      </>)
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
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

  const handleCreateNew = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    try {
      const res = await blogService.createNew({ title, author, url })
      setIsError(true)
      console.log(res);
      setNotificationMessage(`a new blog ${res.title} by ${res.author} added`)
      setIsError(false)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setNotificationMessage(error)
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
    
  }

  return <div style={{ margin: '0 Auto', maxWidth: '800px' }}>
    <NotificationBanner message={notificationMessage} isError={isError}/>
    {user === null
      ?loginForm()
      : blogsList()}
    </div>
}


export default App