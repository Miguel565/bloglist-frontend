import { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
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
    blogServices.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const onLogin = async (username, passwordd) => {
    event.preventDefault()
    try{
      const user = await loginServices.getAll(username, password)
      setUser(user)
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        message: `${error}`,
        type: 'error',
        setTimeout(() => {
          setNotification([])
        }, 5000)
      })
    }
    if (user === null){
      return (
        <div>
          <Notification notification={notification} />
          <Login handleLogin={onLogin} />
        </div>
      )
    }
  }

  return (
    <div className="App">
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App