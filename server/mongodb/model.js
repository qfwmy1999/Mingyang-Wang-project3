const db = require('./connect')

// User
const userSchema = new db.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Entry
const entrySchema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    timestamp: {
        type: Number,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
})

// Review
const reviewSchema = new db.Schema({
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    entryId: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
})

module.exports = {
    UserModel: db.model('user', userSchema),
    EntryModel: db.model('entry', entrySchema),
    ReviewModel: db.model('review', reviewSchema)
}