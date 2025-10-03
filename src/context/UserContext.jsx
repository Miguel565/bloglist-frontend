import { createContext, useContext } from 'react'
import { useAuthUser } from '../hooks/useAuthUser'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const authUser = useAuthUser()

  return (
    <UserContext.Provider value={authUser}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext debe usarse dentro de UserProvider')
  }
  return context
}
