const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',
        { 'username': 1, 'name': 1, 'id': 1 })
    response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
    const content = {
        title: request.body.title,
        author: request.body.author,
        likes: request.body.likes,
        url: request.body.url,
        user: request.body.user
    }
    const post = new Blog(content)
    const result = await post.save()
    const user = await User.findById(request.body.user)
    user.blogs = user.blogs.concat(result._id)
    user.save()
    response.status(201).json(result)
})

bloglistRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const post = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.body.user,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, post, { new: true } )
    response.json(updatedBlog)
})

module.exports = bloglistRouter