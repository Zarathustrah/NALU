const router = require('express').Router()
const surfSpots = require('../controllers/surfSpots')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/surfspots')
  .get(surfSpots.index)
  .post(secureRoute, surfSpots.create)

router.route('/surfspots/:id')
  .get(surfSpots.show)
  .put(secureRoute, surfSpots.edit)
  .delete(secureRoute, surfSpots.delete)

router.route('/surfspots/:id/comments')
  .post(secureRoute, surfSpots.commentCreate)

router.route('/surfspots/:id/comments/:commentId')
  .delete(secureRoute, surfSpots.commentDelete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

module.exports = router