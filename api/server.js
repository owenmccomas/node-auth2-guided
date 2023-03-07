const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');


const authRouter = require('./auth/auth-router.js')
const usersRouter = require('./users/users-router.js')

const server = express()
server.use(bodyParser.urlencoded({ extended: false }))

server.use(express.static(path.join(__dirname, '../client')))
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
