import { Card, Container, ListGroup, Button } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import dayjs from 'dayjs'
import { getEntryById, getReviewByEntryId, deleteReview } from './api'
import { useApp } from './context'
import ReviewForm from "./components/ReviewForm"

const Entry = () => {
    const { id } = useParams()
    const getReviews = useCallback(() => {
        getReviewByEntryId(id).then(res => {
            setReviews(res.data)
        })
    }, [id])

    const navigate = useNavigate()
    const { userinfo, setUserinfo } = useApp()

    const [entry, setEntry] = useState({})
    const [reviews, setReviews] = useState([])
    const [reviewData, setReviewData] = useState(null)
    useEffect(() => {
        getEntryById(id).then(res => {
            setEntry(res.data)
        }).catch(() => {
            navigate('/')
        })

        getReviews()
    }, [id, getReviews, navigate])

    const del = useCallback((id) => {
        deleteReview(id).then(() => {
            getReviews()
        }).catch(err => {
            if (err.response.status === 403) {
                setUserinfo({})
                localStorage.removeItem('userinfo')
                navigate('/login')
            }
        })
    }, [getReviews, setUserinfo, navigate])

    const handleReviewSuccess = () => {
        setReviewData(null)
        getReviews()
    }

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{entry.title}</Card.Title>
                    <Card.Text>
                        <span className="text-muted">Director：</span>{entry.director}<br />
                        <span className="text-muted">Release Year：</span>{entry.year}
                    </Card.Text>
                </Card.Body>
            </Card>

            <p className="d-flex justify-content-between mt-3">
                {reviews.length ? `Reviews(${reviews.length})` : 'No Review'}
            </p>
            <ListGroup variant="flush" as="ol" numbered>
                {reviews.map((v, i) => (
                    <ListGroup.Item as="li" key={i} className="d-flex justify-content-between">
                        <div className="ms-2 w-100">
                            <div className="d-flex justify-content-between align-items-start">
                                <span>{v.text}</span>
                                {userinfo.id && userinfo.id === v.creator && (
                                    <div>
                                        <Button size="sm" onClick={() => setReviewData(v)}>Edit</Button>{' '}
                                        <Button size="sm" variant="danger" onClick={() => del(v._id)}>Delete</Button>
                                </div>
                                )}
                            </div>
                            <span className="text-muted fs-6">
                              { dayjs(v.timestamp).format('YYYY-MM-DD HH:mm:ss') }
                            </span>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {userinfo.id && <ReviewForm entryId={id} data={reviewData} onSuccess={handleReviewSuccess} />}
        </Container>
    )
}

export default Entry