const express = require('express')
const session = require('express-session')
const api = require('./api')

const app = express()
app.use(session({
    secret: 'review app',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: false
    },
    rolling: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', api)

app.listen(8000, function() {
    console.log('Starting server')
})