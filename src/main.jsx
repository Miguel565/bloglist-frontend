import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './context/NotificationContext'
//import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationContextProvider>
        <App />
    </NotificationContextProvider>
)
