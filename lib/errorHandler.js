const { notFound, unauthorized, validationError } = require('./errorMessage')

function errorHandler(err, req, res, next) {
  if (err.name === validationError) {

    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json({ errors: customErrors })
  }

  if (err.message === notFound || err.name === 'CastError') {
    return res.status(404).json({ message: 'Not Found' })
  }

  if (err.message === unauthorized) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.sendStatus(500)
  next(err)
}

module.exports = errorHandler
