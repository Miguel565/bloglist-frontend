import { useEffect } from 'react'
//import './App.css'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import LoginForm from './components/Login'
import { useAuthUser } from './hooks/useAuthUser'
import { Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  const { authUser, checkUserStatus } = useAuthUser()

  useEffect(() => {
    checkUserStatus()
  }, [])

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Blogs</h1>
      </header>
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={authUser ? <UserList /> : <Navigate replace to='/login' />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App