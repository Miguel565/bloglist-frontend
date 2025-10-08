import { Link } from 'react-router-dom'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import { useAuthUser } from '../hooks/useAuthUser'

const NavBar = () => {
    const { authUser, userLogout } = useAuthUser()

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <nav>
                <ul>
                    <li style={padding}><Link to="/">blogs</Link></li>
                    <li style={padding}><Link to="/users">users</Link></li>
                </ul>
                <div>
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
                                <strong>{authUser.name}</strong> logged in
                                <button onClick={() => userLogout()}>Logout</button>
                            </p>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}

export default NavBar