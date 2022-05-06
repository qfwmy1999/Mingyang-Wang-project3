import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, ListGroup, Button } from 'react-bootstrap'
import dayjs from 'dayjs'
import { getEntry, deleteEntry } from './api'
import { useApp } from './context'

function App() {
  const { userinfo, setUserinfo } = useApp()

  const navigate = useNavigate()

  const getEntries = useCallback(() => {
    getEntry().then(res => {
      if (res.status === 200) {
        setEntries(res.data)
      }
    })
  }, [])

  const [entries, setEntries] = useState([])
  useEffect(() => {
    getEntries()
  }, [getEntries])

  const del = useCallback((id) => {
    deleteEntry(id).then(() => {
      getEntries()
    }).catch(err => {
      if (err.response.status === 403) {
        setUserinfo({})
        localStorage.removeItem('userinfo')
        navigate('/login')
      }
    })
  }, [getEntries, setUserinfo, navigate])

  return (
    <Container className="mt-3">
      <ListGroup variant="flush" as="ol" numbered>
        {entries.map(v => (
          <ListGroup.Item key={v._id} as="li" className="d-flex justify-content-between">
            <div className="ms-2 w-100">
              <div className="d-flex justify-content-between align-items-start">
                <Link to={`/entry/${v._id}`} className="fw-bold text-dark text-decoration-none">{v.title}</Link>
                {userinfo.id && userinfo.id === v.creator && (
                  <div>
                    <Button size="sm" onClick={() => navigate(`/create?id=${v._id}`)}>Edit</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => del(v._id)}>Delete</Button>
                  </div>
                )}
              </div>
              <span className="text-muted fs-6">
                { dayjs(v.timestamp).format('YYYY-MM-DD HH:mm:ss') }
              </span>
            </div>
            {/* <Badge bg="primary" pill>14</Badge> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default App
