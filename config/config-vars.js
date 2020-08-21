module.exports = {
    jwt: process.env.JWT_SECRET || 'secret secret',
    rounds: process.env.BCRYPT_ROUNDS || 10
}