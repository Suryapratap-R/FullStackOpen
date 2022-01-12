const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
  // const blogs = await Blog.find({})
  // console.log(blogs)

  // response.json(blogs.map(blog => blog.toJSON()))

  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })

  // Blog.find({}).then(blogs => {
  //   response.json(blogs)
  // })

})

bloglistRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const post = await blog.save()

  response.status(201).json(post)

})

module.exports = bloglistRouter