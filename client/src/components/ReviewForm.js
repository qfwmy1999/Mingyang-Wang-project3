import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { createReview, updateReview } from '../api'
import { useApp } from '../context'

const ReviewForm = (props) => {
    const { userinfo } = useApp()

    const [validated, setValidated] = useState(false)
    const [text, setText] = useState('')
    const handleTextChange = (event) => {
        setText(event.currentTarget.value)
    }

    useEffect(() => {
        if (props.data) {
            setText(props.data.text)
        }
    }, [props.data])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
            const action = props.data ? updateReview(props.data._id, { ...props.data, text }) : createReview({ text, timestamp: Date.now(), entryId: props.entryId, creator: userinfo.id })
            action.then(() => {
                setText('')
                setValidated(false)
                props.onSuccess && props.onSuccess()
            })
        }
        setValidated(true)
    }

    return (
        <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Create a Review</Form.Label>
                <Form.Control required as="textarea" row={3} placeholder="Review Content" value={text} onChange={handleTextChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default ReviewForm