import { useState, useEffect } from 'react'
//import './App.css'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogServices from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const userJSON = JSON.parse(loggedUserJSON)
      setUser(userJSON)
      blogServices.setToken(user.token)
    }
  }, [])

  const onLogin = async (username, password) => {
    try {
      const user = await loginServices.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogServices.setToken(user.token)
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'Wrong user or password'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.error('Login error: ', error)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blogs</h1>
      </header>
      <Notification />
      {
        !user && <div>
          <Togglable buttonLabel="login">
            <LoginForm handleLogin={onLogin} />
          </Togglable>
        </div>
      }
      {
        user && <div>
          <p>
            {user.name} logged in
            <button onClick={() => logOut()}>Logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFomrRef}>
            <BlogForm />
          </Togglable>
        </div>
      }
      <BlogList />
    </div>
  )
}

export default App