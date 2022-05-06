import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useApp } from '../context'

const Header = () => {
    const { userinfo, setUserinfo } = useApp()

    const logout = () => {
        setUserinfo({})
        localStorage.removeItem('userinfo')
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Movie Review App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {
                        userinfo.name ? (
                            <Nav>
                                <NavDropdown title={userinfo.name} id="navDropdown">
                                    <NavDropdown.Item href="#/create">Create a Movie</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav>
                                <Link className="nav-link" to="/login">Log In</Link>
                                <Link className="nav-link" to="/login?type=register">Register</Link>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header