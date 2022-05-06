import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Alert, Form, Button } from 'react-bootstrap'
import { useApp } from './context'
import { getEntryById, createEntry, updateEntry } from './api'

const Create = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    useEffect(() => {
        const id = params.get('id')
        if (id) {
            getEntryById(id).then(res => {
                setTitle(res.data.title)
                setDirector(res.data.director)
                setYear(res.data.year)
            })
        }
    }, [params])

    const current = new Date().getFullYear()
    const start = 1895

    const { userinfo } = useApp()
    const [alertMessage, setAlertMessage] = useState('')

    const [validated, setValidated] = useState(false)
    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [year, setYear] = useState(current)

    const handleTitleChange = (event) => {
        setTitle(event.currentTarget.value)
    }
    const handleDirectorChange = (event) => {
        setDirector(event.currentTarget.value)
    }
    const handleYearChange = (event) => {
        setYear(event.currentTarget.value)
    }
    
    const handleSubmit = (event) => {
        setAlertMessage('')
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
            const id = params.get('id')
            const action = id ? updateEntry(id, { title, director, year }) : createEntry({ title, director, year, timestamp: Date.now(), creator: userinfo.id })
            action.then(res => {
                navigate(`/entry/${res.data}`)
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
            <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="director">
                    <Form.Label>Director</Form.Label>
                    <Form.Control required type="text" placeholder="Director" value={director} onChange={handleDirectorChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Release Year</Form.Label>
                    <Form.Select value={year} onChange={handleYearChange}>
                        {Array(current - start + 1).fill('').map((v, i) => <option value={current - i} key={i}>{(current - i)}</option>)}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default Create