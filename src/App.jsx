import { useEffect } from 'react'
//import './App.css'
import BlogList from './components/BlogList'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import { useAuthUser } from './hooks/useAuthUser'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const { authUser, userLogout, checkUserStatus } = useAuthUser()

  useEffect(() => {
    checkUserStatus()
  }, [])

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
        </div>
      }
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  )
}

export default App