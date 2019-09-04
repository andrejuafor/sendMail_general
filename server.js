'use strict'

const debug = require('debug')('ApiImage:*')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

const {
  apiImage
} = require('./routes')

// Evitar problemas de CORS:
app.use(function (req, res, next) {
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit:'2097152' }))
app.use(bodyParser.json())

app.use('/SendMailApi', apiImage)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(err)
  debug(`Error message: ${err.message}`)

  res.status(500).send({
    error: true,
    stack: err,
    description: `${err.message}`,
    results: null
  })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[SendMailApi]')} server listening on port ${port}`)
  })
}
