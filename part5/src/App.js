import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

// const NotificationBanner = ({message, isError}) => 
// {
//   const color = isError ? 'Crimson' : 'green'
//   return message!==null?(
//     <div style={{ border: `4px solid ${color}`, borderRadius: '8px', padding: '10px', maxWidth: '700px', margin: '18px 0', color: color }}>
//     {message}
//     </div>
//   ):null
// }


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : null)
  // const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  
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
      {/* <NotificationBanner message={'null'} isError={false}/> */}
      <h2>blogs</h2>
      {user.name} logged in
    <div style={{paddingTop: '20px'}}>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
      </>)
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
    console.log(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    console.log(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userResponse = await loginService({
        username: username,
        password: password
      })
      setUser(userResponse)
      window.localStorage.setItem('user', JSON.stringify(userResponse))
    } catch (error) {
      
    }
  }

  return <div style={{ margin: '0 Auto', maxWidth: '800px' }}> 
    {user === null
      ?loginForm()
      : blogsList()}
    </div>
}


export default App