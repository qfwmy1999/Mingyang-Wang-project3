import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Container, Tabs, Tab, Form, Button, Alert } from 'react-bootstrap'
import { login, register } from './api'
import { useApp } from './context'

const Login = () => {
    const [params] = useSearchParams()
    const { setUserinfo } = useApp()

    const [activeKey, setActiveKey] = useState('')
    const [alertMessage, setAlertMessage] = useState("")
    const [validated, setValidated] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        setActiveKey(params.get('type') || 'login')
        setAlertMessage("")
        setValidated(false)
        setUsername("")
        setPassword("")
    }, [params])

    const handleUsernameChange = (event) => {
        setUsername(event.currentTarget.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }
    
    const navigate = useNavigate()
    const handleLogin = (event) => {
        setAlertMessage('')
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
            login({ username, password }).then(res => {
                const userinfo = {
                    id: res.data._id,
                    name: res.data.username
                }
                setUserinfo(userinfo)
                localStorage.setItem('userinfo', JSON.stringify(userinfo))
                navigate('/')
            }).catch(err => {
                if (err.response.data) {
                    setAlertMessage(err.response.data)
                }
            })
        }
        setValidated(true)
    }

    const handleRegister = (event) => {
        setAlertMessage('')
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
            register({ username, password }).then(res => {
                const userinfo = {
                    id: res.data._id,
                    name: res.data.username
                }
                setUserinfo(userinfo)
                localStorage.setItem('userinfo', JSON.stringify(userinfo))
                navigate('/')
            }).catch(err => {
                if (err.response.data) {
                    setAlertMessage(err.response.data)
                }
            })
        }
        setValidated(true)
    }

    return (
        <Container className="mt-3">
            {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
            <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                <Tab eventKey="login" title="Log In">
                    <Form className="mt-3" noValidate validated={validated} onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="loginUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Username" onChange={handleUsernameChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" onChange={handlePasswordChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Log In</Button>
                    </Form>
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Form className="mt-3" noValidate validated={validated} onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="registerUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Username" onChange={handleUsernameChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" onChange={handlePasswordChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Login