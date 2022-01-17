const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken');

const getAuthTokenFrom = request => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',
        { 'username': 1, 'name': 1, 'id': 1 })
    response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
    const token = getAuthTokenFrom(request)
    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({'error': 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const content = {
        title: request.body.title,
        author: request.body.author,
        likes: request.body.likes,
        url: request.body.url,
        user: user._id
    }
    const post = new Blog(content)
    const result = await post.save()
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