const request = require('supertest')
const app = require('../app')

const roomid = 'ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789'

describe('Express routes', () => {
  test('GET /', () => {
    return request(app).get('/').then(res => {
      console.info(res.request.url)
      expect(res.statusCode).toBe(200)
    })
  })

  test('POST /', () => {
    return request(app).post('/').send({ username: 'Bob' }).then(res => {
      expect(res.statusCode).toBe(307)
      expect(res.headers.location.length).toBe(65)
      expect(res.headers.location.match(/\/[0-9A-F]{64}/)[0]).toBe(res.headers.location)
    })
  })

  test('POST / with roomid', () => {
    return request(app).post('/').send({ username: 'Bob', roomid }).then(res => {
      expect(res.statusCode).toBe(307)
      expect(res.headers.location).toBe(`/${roomid}`)
    })
  })

  test('POST /:id', () => {
    return request(app).post(`/${roomid}`).send({ username: 'Bob', roomid }).then(res => {
      expect(res.statusCode).toBe(200)
    })
  })
})
