import express = require('express')
import cors = require('cors')
import logger = require('morgan')
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'

import { api as comparisonApi } from './api/comparison'
import { api as authenticationApi } from './api/authentication'

const PORT = process.env.SERVER_PORT

const app: express.Application = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))

// credentials needed for cross-origin cookie setting
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  })
)

app.use('/api/v1/', comparisonApi)
app.use('/api/v1/', authenticationApi)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || res.statusCode || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
