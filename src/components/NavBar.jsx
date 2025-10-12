import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthUser } from '../hooks/useAuthUser'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const NavBar = () => {
    const { authUser, userLogout, checkUserStatus } = useAuthUser()

    useEffect(() => {
        checkUserStatus()
    }, [])

    return (
        <div>
            <Navbar bg="light" data-bs-theme="blue" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="/vite.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Vite logo"
                        />
                        Blogs App
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                        <Nav className="justify-content-center">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/">Blogs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                {
                                    authUser
                                        ? <Navbar.Text>
                                            Sigin as: <strong>{authUser.name}</strong>
                                            <Button variant="secondary" onClick={() => userLogout()}>Logout</Button>
                                        </Navbar.Text> : <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                }
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </div>
    )
}

export default NavBar