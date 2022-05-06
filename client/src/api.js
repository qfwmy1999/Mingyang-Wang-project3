import axios from 'axios'

export const login = (params) => axios.post('/api/login', params)
export const register = (params) => axios.post('/api/register', params)

export const getEntry = () => axios.get('/api/entry')
export const getEntryById = (id) => axios.get(`/api/entry/${id}`)
export const getReviewByEntryId = (id) => axios.get(`/api/entry/${id}/review`)
export const createEntry = (params) => axios.post('/api/entry', params)
export const updateEntry = (id, params) => axios.put(`/api/entry/${id}`, params)
export const deleteEntry = (id) => axios.delete(`/api/entry/${id}`)

export const createReview = (params) => axios.post('/api/review', params)
export const updateReview = (id, params) => axios.put(`/api/review/${id}`, params)
export const deleteReview = (id) => axios.delete(`/api/review/${id}`)