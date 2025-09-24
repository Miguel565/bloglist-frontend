import { createContext, useContext } from 'react'
import { useNotification } from '../hooks/useNotification'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const notification = useNotification()

    return (
        <NotificationProvider.provider value={notification}>
            {children}
        </NotificationProvider.provider>
    )
}

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('Context must be used')
    }
    return context
}