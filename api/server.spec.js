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

    describe('POST /login', () => {
        it('returns status 200', async () => {
            const res = await supertest(server)
                .post('/api/auth/login')
                .send(testUser)

            expect(res.status).toBe(200)
        })
        it('returns a token', async () => {
            const res = await supertest(server)
                .post('/api/auth/login')
                .send(testUser)

            expect(res.body).toHaveProperty('token')
            expect(res.type).toMatch(/json/i)
        })
    })
})

describe('jokes-router', () => {
    //next batch of code is for storing token to use to access restricted
    let token;
    beforeEach((done) => {
        supertest(server)
            .post('/api/auth/login')
            .send(testUser)
            .end((err, response) => {
            token = response.body.token
            done();
            });
        });
    //STORE DONE


    describe('GET /api/jokes', () => {
        it('returns 401 without token', async () => {
            const res = await supertest(server)
                .get('/api/jokes')

            expect(res.status).toBe(401)
        })

        it('accesses the route with a token', async () => {
            const res = await supertest(server)
                .get('/api/jokes')
                .set('Authorization', `${token}`)

            expect(res.status).toBe(200)
            expect(res.type).toMatch(/json/i)
        })
    })
})