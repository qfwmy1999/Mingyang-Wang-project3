const express = require('express')
const { UserModel, EntryModel, ReviewModel } = require('./mongodb/model')

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username } = req.body
    const isExist = await UserModel.findOne({ username })
    if (!isExist) {
        const user = new UserModel(req.body)
        await user.save()
        res.send(user)
    } else {
        res.status(400).send('Username already exists')
    }
})

router.post('/login', async (req, res) => {
    const users = await UserModel.find()
    const user = users.find(v => v.username === req.body.username && v.password === req.body.password)
    if (user) {
        req.session.userId = user._id
        res.send(user)
    } else {
        res.status(400).send('The username or password is not correct, please try again')
    }
})

// Entry
// Get entry lists
router.get('/entry', async (req, res) => {
    try {
        const entries = await EntryModel.find().sort({ timestamp: 'desc' })
        res.send(entries)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// get entry
router.get('/entry/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findById(req.params.id)
        if (entry) {
            res.send(entry)
        } else {
            throw(Error('The entry does not exist'))
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// get reviews of the entry
router.get('/entry/:id/review', async (req, res) => {
    try {
        const entry = await ReviewModel.find({ entryId: req.params.id })
        res.send(entry)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// create
router.post('/entry', async (req, res) => {
    try {
        const entry = new EntryModel(req.body)
        await entry.save()
        res.send(entry._id)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// edit
router.put('/entry/:id', async (req, res) => {
    try {
        await EntryModel.findByIdAndUpdate(req.params.id, req.body)
        res.send(req.params.id)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// delete
router.delete('/entry/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findOne({ _id: req.params.id })
        if (entry && entry.creator !== req.session.userId) {
            res.status(403).send('No delete permission')
        } else {
            await EntryModel.findByIdAndRemove(req.params.id)
            await ReviewModel.deleteMany({ entryId: req.params.id })
            res.send('success')
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Review
// create
router.post('/review', async (req, res) => {
    try {
        const review = new ReviewModel(req.body)
        await review.save()
        res.send('success')
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// edit
router.put('/review/:id', async (req, res) => {
    try {
        await ReviewModel.findByIdAndUpdate(req.params.id, req.body)
        res.send('success')
    } catch (err) {
        res.status(400).send(err.message)
    }
})
// delete
router.delete('/review/:id', async (req, res) => {
    try {
        const review = await ReviewModel.findOne({ _id: req.params.id })
        if (review && review.creator !== req.session.userId) {
            res.status(403).send('No delete permission')
        } else {
            await ReviewModel.findByIdAndRemove(req.params.id)
            res.send('success')
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router