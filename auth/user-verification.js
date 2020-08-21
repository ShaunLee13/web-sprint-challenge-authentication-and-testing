module.exports = {
    verifyUser
}

function verifyUser(user) {
    return Boolean(user.username && user.password)
}