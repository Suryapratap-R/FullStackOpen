const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app)

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


afterAll(() => {
    console.log("connection closed");
    mongoose.connection.close()
})