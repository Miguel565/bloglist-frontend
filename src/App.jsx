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
        text: 'Add new blog fails',
        timeout: setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      console.error('Error adding blog: ', error)
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

  const loginForm = () => (
    <div>
      <LoginForm handleLogin={onLogin} />
    </div>
  )

  {/*const blogForm = () => (
    <div>
      <BlogForm createBlog={addBlog} />
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }*/}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blogs</h1>
      </header>
      <Notification message={notification} />  // Step 4
      {!user && loginForm()}
      {
        user && <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new blog" ref={blogFomrRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }
      {/*
        user === null ?
          handleForm() :
          <>
            <div>
              <p>{user.username} logged in</p>
              <button onClick={() => logOut()} >Logout</button>
              <br />
            </div>
            {blogForm()}
          </>
      */}
      <h2>Blogs list</h2>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App