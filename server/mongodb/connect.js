const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/review-app'

mongoose.connect(url).then(() => {
    console.log('Database Connection successful')
}).catch(err => {
    console.log('Database Connection failed', err.message)
})

module.exports = mongoose