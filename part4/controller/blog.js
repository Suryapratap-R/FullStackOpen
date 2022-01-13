const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})



module.exports = bloglistRouter