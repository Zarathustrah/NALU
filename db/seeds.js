const mongoose = require('mongoose')
const { dbURI } = require('../config/environments')
const SurfSpot = require('../models/surfSpot')
const User = require('../models/user')
const spotsCollectionData = require('./data/spotsCollection')
const userData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err, db) => {

    if (err) {
      console.log(err)
      return
    }

    try {

      await db.dropDatabase()
      console.log('Database dropped 👋')

      const users = await User.create(userData)
      console.log(`${'🏄‍♂️'.repeat(users.length)} created`)

      const surfSpotsWithUsers = spotsCollectionData.map(spots => {
        spots.user = users[0]._id
        return spots
      })

      const surfSpots = await SurfSpot.create(surfSpotsWithUsers)
      console.log(`${'🌊'.repeat(surfSpots.length)} Surf Spots created `)

      await mongoose.connection.close()
      console.log('Goodbye 🙋🏽')

    } catch (err) {

      await mongoose.connection.close()
      console.log(err)
    }
  }
)