const Blog = require('../models/blog');
const User = require('../models/user');
const testingRouter = require('express').Router();

testingRouter.post('/reset', async (req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    res.status(204).end()
})


module.exports = testingRouter