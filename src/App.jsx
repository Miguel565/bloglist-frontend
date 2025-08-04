import { useState, useEffect, useRef } from 'react'
import './App.css'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'  // Step 4
import blogServices from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState([])  // Step 4
  const [user, setUser] = useState(null)

  const blogFomrRef = useRef()

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
  }, [])

  const addBlog = async (title, author, url) => {
    try{
      blogFomrRef.current.toggleVisibility()
      const result = await blogServices.create({ title, author, url })
      setBlogs(blogs.concat(result))
      setNotification({
        type: 'info',
        text: `New blog ${title} by ${author} added`,
        timeout: setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'FAilure to add new blog',
        timeout: setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      console.error('Error adding blog: ', error)
    }
  }

  const updateBlogLikes = async (blog) => {
    try {
      const result = await blogServices.update(blog.id, { ...blog, likes: blog.likes + 1 })
      setBlogs(blogs.map(b => b.id === blog.id ? result : b))
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'Failure to do like, try again',
        timeout: setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      console.error('Error updating blog likes: ', error)
    }
  }

  const onLogin = async (username, password) => {
    try {
      const user = await loginServices.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogServices.setToken(user.token)
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
          <Togglable buttonLabel="new blog" ref={blogFomrRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }
      <h2>Blogs list</h2>
      <Blogs blogs={blogs} handleLikes={updateBlogLikes} />
    </div>
  )
}

export default App