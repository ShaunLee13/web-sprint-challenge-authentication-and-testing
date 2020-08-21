const supertest = require('supertest')

const server = require('./server')
const db = require('../database/dbConfig')

describe('server', () => {

    describe('GET /', () => {
        it('should return status 200', async () => {
            const res = await supertest(server).get('/')

            expect(res.status).toBe(200)
        })

        it('should return a JSON object', async () => {
            const res = await supertest(server).get('/')

            expect(res.type).toMatch(/json/i)
            expect(res.body).toMatchObject({api:'running'})
        })
    })
})

describe('auth-router', () => {
    // beforeEach( async () => {
    //     await db('test').truncate()
    // })
})

describe('jokes-router', () => {

})