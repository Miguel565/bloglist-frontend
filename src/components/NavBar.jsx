import { Link } from 'react-router-dom'
import { useAuthUser } from '../hooks/useAuthUser'

const NavBar = () => {
    const { authUser, userLogout } = useAuthUser()

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <nav>
                <div>
                    <Link style={padding} to="/">blogs</Link>
                    <Link style={padding} to="/users">users</Link>
                    {authUser
                        ? <p>
                            <strong>{authUser.name}</strong> logged in 
                            <button onClick={() => userLogout()}>Logout</button>
                        </p> : <Link style={padding} to="/login">login</Link>
                    }
                </div>
            </nav>
        </div>
    )
}

export default NavBar