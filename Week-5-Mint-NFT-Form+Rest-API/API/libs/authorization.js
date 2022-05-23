// All API CALLS must be authenticated
// Who have api key can handle only the associate subscription (there isn't the case that a user use an amount from another user or contract from other)
// HINT: could be one way to save subscriptionId in req after have done the authentication
const crypto = require('crypto')
const Errors = require('throwable-http-Errors')
const jwt = require('jsonwebtoken')
const { ApikeyModel } = require('../src/apikeys/apikey.model.js')

async function auth (req, res, next) {
  if (!req.headers.authorization) {
    return next(new Errors.Unauthorized('Missing authorization header'))
  }

  const authType = req.headers.authorization.slice(0, req.headers.authorization.indexOf(' ')).toLowerCase()
  const token = req.headers.authorization.slice(req.headers.authorization.indexOf(' ') + 1)

  if (authType === 'bearer') {
    try {
      req.authentication = Object.assign({}, jwt.verify(token, process.env.JWT_SECRET), { type: 'Bearer' })
    } catch (err) {
      return next(new Errors.Unauthorized(err.message))
    }
  } else if (authType === 'basic') {
    const providedKey = token
    const hashedKey = crypto.createHash('sha256').update(providedKey).digest('base64')
    const matchedKey = await ApikeyModel.findOne({ value: hashedKey, type: 'super-admin' })

    if (!matchedKey) {
      return next(new Errors.Unauthorized('Invalid signature'))
    } else {
      req.authentication = { type: 'Basic' }
    }
  } else if (authType === 'apikey') {
    const providedKey = token
    const hashedKey = crypto.createHash('sha256').update(providedKey).digest('base64')
    const matchedKey = await ApikeyModel.findOne({ value: hashedKey, status: 'active' })

    if (!matchedKey) {
      return next(new Errors.Unauthorized('Invalid Api key'))
    }

    if (matchedKey.status !== 'active') {
      return next(new Errors.Unauthorized('Revoked Api key'))
    }

    req.authentication = Object.assign({}, matchedKey.toJSON(), { type: 'ApiKey' })
  } else {
    return next(new Errors.BadRequest('Unknown Authentication Type'))
  }

  next()
}

module.exports = { auth }
