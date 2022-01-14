const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
    const content = {
        title: request.body.title,
        author: request.body.author,
        likes: request.body.likes,
        url: request.body.url
    }
    const post = new Blog(content)
    const result = await post.save()
    response.json(result)
})

bloglistRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

module.exports = bloglistRouter