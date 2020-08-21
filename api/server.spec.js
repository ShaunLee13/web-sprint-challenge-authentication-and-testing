const supertest = require('supertest')

const server = require('./server')
const db = require('../database/dbConfig')

const testUser = {
    username:"testuser123", 
    password:"testing123"
}

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

    describe('POST /register', () => {
        beforeEach( async () => {
            await db('users').truncate()
        })
        it('returns status 201', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send(testUser)

            expect(res.status).toBe(201)
        })
        it('posts the object to the database', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send(testUser)

                const test = await db('users')

                expect(test).toHaveLength(1)
        })

    })
})

describe('jokes-router', () => {

})