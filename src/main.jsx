import ReactDOM from 'react-dom/client'
import { NotificationProvider } from './context/NotificationContext'
import { UserProvider } from './context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
//import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <NotificationProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                </Router>
            </QueryClientProvider>
        </NotificationProvider>
    </UserProvider>
)
