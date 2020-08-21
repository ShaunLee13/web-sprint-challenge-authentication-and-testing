const { verifyUser } = require('./user-verification')

const validUser = {
    username:'jack',
    password:'frost'
}

const invalid = {
    nota:'gooduser'
}

const invalid2 = {
    username: 'stillnotgood'
}

const invalid3 = {
    password: 'butihaveapassword'
}

describe('data verification', () => {
    it('checks that the received object is valid', () => {
        expect(verifyUser(validUser)).toBe(true)
        expect(verifyUser(invalid)).toBe(false)
        expect(verifyUser(invalid2)).toBe(false)
        expect(verifyUser(invalid3)).toBe(false)
    })
})