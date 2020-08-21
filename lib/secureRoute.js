const jwt = require('jsonwebtoken')
const { secret } = require('../config/environments')
const User = require('../models/user')

async function secureRoute(req, res, next) {
  try {
    if (!req.headers.authorization) throw new Error()
    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, secret) 

    const user = await User.findById(payload.sub)

    if (!user) throw new Error()

    req.currentUser = user

    next()

  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = secureRoute