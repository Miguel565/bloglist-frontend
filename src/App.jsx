import { useEffect } from 'react'
//import './App.css'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserList from './components/UserList'
import { useAuthUser } from './hooks/useAuthUser'

const App = () => {
  const { authUser, userLogout, checkUserStatus } = useAuthUser()

  useEffect(() => {
    checkUserStatus()
  }, [])

  const url = location.pathname
  console.log('Url: ', url)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blogs</h1>
      </header>
      <Notification />
      {
        !authUser && <div>
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </div>
      }
      {
        authUser && <div>
          <p>
            {authUser.name} logged in
            <button onClick={() => userLogout()}>Logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      }
      {url === '/users' ? <UserList /> : <BlogList />}
    </div>
  )
}

export default App