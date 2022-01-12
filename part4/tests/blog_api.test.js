const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

// const testfunc = async () => {
    
//   await api.get('http://localhost:3000/data').then(
//     req => {
//       console.log('running then')
//       console.log(req)
//     }
//   )
// }

// console.log('Execution Started')
// testfunc().then(() => {
//   console.log('DONE Execution')
// })
// // test('test bloglist returns json or not', async () => {
// //     console.log('here');
// //  const res = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
// //  console.log("res", res);
// // }, 10000)

// // test('verifying id property in json', async () => {
// //     const r = await api.get('/api/blogs')
// //     console.log(r);
// //     expect(r.body.id).toBeDefined()
// // }, 10000)

// // afterAll(() => {
// //     mongoose.connection.close()
// // })

test('verify GET /api/blogs endpoint', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

  expect(response.body.length).toBe(3)
}, 10000)

afterAll(() => {
  mongoose.connection.close()
})