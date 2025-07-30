import { useState, useEffect } from 'react'
import './App.css'
import Blogs from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import blogServices from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogServices.getAll()
      .then(blogs => setBlogs(blogs))
      .catch(error => {
        setNotification({
          type: 'error',
          text: 'Error fetching blogs. Please try again later.',
          timeout: setTimeout(() => {
            setNotification(null);
          }, 5000)
        })
        console.error('Error fetching blogs: ', error)
      })
  }, [])

  const onLogin = async (username, password) => {
    try {
      const user = await loginServices.getAll(username, password)
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'Wrong user or password',
        timeout: setTimeout(() => {
          setNotification([])
        }, 5000)
      })
      console.error('Login error: ', error)
    }
  }

  const handleForm = () => (
    <div>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={onLogin}
      />
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blogs</h1>
      </header>
      <Notification message={notification} />
      {
        user === null ?
        handleForm() :
        <div>
          <p>{user.username} logged in</p>
          <button onClick={() => logOut()} >Logout</button>
        </div>
      }
      <h2>Blogs list</h2>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App