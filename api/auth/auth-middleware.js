const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')
// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({status: 401, message: 'token bad'})
      } else {
        req.decodedJwt = decoded
        console.log(decoded)
        next()
      }
    })
    } else {
    next({status: 401, message: 'no token'})
  }
}

// AUTHORIZATION
const checkRole = (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.role === 'admin'){
    next()
  } else {
    next({ status: 403, message: 'no, sorry'})
  }
}

module.exports = {
  restricted,
  checkRole,
}
