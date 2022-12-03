const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
async function createJwt(user) {
    const token = await jwt.sign(user, JWT_SECRET)
    return token
}

async function verifyJwt(token) {
    const user = jwt.verify(token, JWT_SECRET)
    return user
}

module.exports = {
    createJwt,
    verifyJwt
}