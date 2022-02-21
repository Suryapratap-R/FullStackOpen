const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app)
const saltRound = 10

const loginAndReturnToken = async () => {
    const res = await api.post('/api/login')
        .send({ username: testHelper.userData.username, password: testHelper.userData.password })
    return res.body.token
}

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let post of testHelper.testData) {
        let blogObject = Blog(post)
        await blogObject.save()
    }

    await User.deleteMany({})

    const passHash = await bcrypt.hash(testHelper.userData.password, saltRound)
    const user = User({
        username: testHelper.userData.username,
        name: testHelper.userData.name,
        passwordHash: passHash,
    })
    await user.save()
})

test('verify api endpoint', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
}, 10000)

test('create unique user', async () => {
    await api.post('/api/users').send({
        name: "testName",
        username: "testUsername",
        password: "password"
    }).expect(201)
})

test('create user fails with status when username is lessthan 3 characters', async () => {
    await api.post('/api/users').send(testHelper.shortUserData).expect(400)
})

test('create user fails with status when password is lessthan 3 characters', async () => {
    await api.post('/api/users').send(testHelper.shortPasswordData).expect(400)
})

test('login in with correct username and password', async () => {
    const res = await api.post('/api/login')
        .send({ username: testHelper.userData.username, password: testHelper.userData.password }).expect(200)
        expect(res.body.token).toBeDefined()
})

test('login in with wrong username', async () => {
    await api.post('/api/login')
        .send({ username: testHelper.userData.username+'sdf', password: testHelper.userData.password }).expect(401)
})

test('login in with wrong password', async () => {
    await api.post('/api/login')
        .send({ username: testHelper.userData.username, password: testHelper.userData.password+'sdkjfh' }).expect(401)
})

test('adding blog fails with 401 if token not provided', async () => {
    await api.post('/api/blogs').send({"title": "forth post",
        "author": "suryapratap",
        "url": "/4",
        "likes": 0
    }).expect(401)
})


test('check id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0]._id).toBe(undefined)
}, 10000)

test('verifing POST /api/blogs creates new blogpost with valid auth token', async () => {
    const token = await loginAndReturnToken()

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({
    "title": "forth post",
    "author": "suryapratap",
    "url": "/4",
    "likes": 0
    }).expect(201)
})

test('check default value for likes', async () => {
    const token = await loginAndReturnToken()
    res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({
    "title": "fifth post",
    "author": "suryapratap",
    "url": "/4",
    })
    expect(res.body.likes).toBeDefined()
})
test('check for bad post request', async () => {
    const token = await loginAndReturnToken()
    await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({ "author": "suryapratap" })
        .expect(400)
})

test('delete first post', async () => {
    const token = await loginAndReturnToken()
    
    const userList = await api.get('/api/users').expect(200)
    const startingLength = userList.body[0].blogs.length
    
    // posting blogs
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({
        "title": "post",
        "author": "suryapratap",
        "url": "/4",
        "likes": 0
    }).expect(201)
    
    const ul = await api.get('/api/users').expect(200)
    const blogId = ul.body[0].blogs[0].id
    
    expect(ul.body[0].blogs).toHaveLength(startingLength+1)
    
    await api.delete(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`).expect(204)
    const afterDel = await api.get('/api/users').expect(200)
    expect(afterDel.body[0].blogs).toHaveLength(ul.body[0].blogs.length-1)
})


afterAll(() => {
    console.log("connection closed");
    mongoose.connection.close()
})