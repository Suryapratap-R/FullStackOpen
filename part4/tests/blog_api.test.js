const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { testData } = require('./test_helper');

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let post of testData) {
        let blogObject = Blog(post)
        await blogObject.save()
    }
})

test('verify api endpoint', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
}, 10000)
test('check id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0]._id).toBe(undefined)
}, 10000)

test('verifing POST /api/blogs creates new blogpost', async () => {
    await api.post('/api/blogs').send({"title": "forth post",
    "author": "suryapratap",
    "url": "/4",
    "likes": 0
    })

    const res = await api.get('/api/blogs')
    
    expect(res.body).toHaveLength(testData.length+1)
})

afterAll(() => {
    console.log("connection closed");
    mongoose.connection.close()
})