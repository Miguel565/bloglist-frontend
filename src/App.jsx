import { useState, useEffect, useRef } from 'react'
import './App.css'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogServices from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState([])
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
    blogServices.getAll().then(blogs => {
      const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogs(sorted)
    })
  }, [])

  const addBlog = async (title, author, url) => {
    try {
      blogFomrRef.current.toggleVisibility()
      const result = await blogServices.create({ title, author, url })
      setBlogs(prevBlogs => [...prevBlogs, result].sort((a, b) => b.likes - a.likes))
      setNotification({
        type: 'info',
        text: `New blog ${title} by ${author} added`
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'FAilure to add new blog'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.error('Error adding blog: ', error)
    }
  }

  const updateBlogLikes = async (blog) => {
    try {
      const result = await blogServices.update(blog.id, { ...blog, likes: blog.likes + 1 })
      setBlogs(prevBlogs => prevBlogs.map(b => b.id === blog.id ? result : b).sort((a, b) => b.likes - a.likes))
    } catch (error) {
      setNotification({
        type: 'error',
        text: 'Failure to do like, try again'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
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
        text: 'Wrong user or password'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.error('Login error: ', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogServices.deleteBlog(id)
        setBlogs(blogs => blogs.filter(blog => blog.id !== id))
        setNotification({
          type: 'info',
          text: 'Blog deleted successfully'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (error) {
        setNotification({
          type: 'error',
          text: 'Error deleting blog, try again'
        })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        console.error('Delete error: ', error)
      }
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
          <Togglable buttonLabel="create new blog" ref={blogFomrRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }
      <h2>Blogs list</h2>
      <Blogs blogs={blogs} handleLikes={updateBlogLikes} onDelete={handleDelete} />
    </div>
  )
}

export default App