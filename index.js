const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./config/router')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
const { dbURI } = require('./config/environments')
const port = 7000

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo is Connected')
  }
)
app.use(express.json())

app.use(logger)

app.use(router)

app.use(errorHandler)

app.listen(port, () => console.log(`Lisening on Port: ${port}`))


// TODO    *************************************
//          B   db > seeds.js     
//          B   db > data > surfSpots.js
//         B   db > data > users.js
//          B   models > surfSpot.js
// TODO     J   models > user.js
// TODO     J   lib > errorHandler.js
//          J   lib > errorMessage.js
//          J   lib > logger.js
//          J   lib > secureRoute.js
//          B   controllers > auth.js
//          B   controllers > surfSpots.js
//          J   config > environment.js
//          J   config > router 
// TODO



// ? TERMINAL COMMAND LINES   ***********************
// ?    npm install express
// ?    npm run seed
// ?    npm i mongoose-unique-validator
// ?    npm i http-proxy-middleware
// ?    npm i bcrypt
// ?    npm i jsonwebtoken
// ?    npm i mongoose
// ? 


// * INSOMNIA SET UP    ***************************
// *
// *  AUTH REQUESTS
// *      POST LOGIN USER
// *      POST REGISTER 
// *
// *  SURF SPOTS REQUESTS
//*
// *    MEMBER REQUESTS
// *      PUT EDIT A SINGLE SURF SPOT
// *      DEL DLETE A SINGLE SURF SPOT
// *      GET GET A SINGLE SURFSPOT
//*
// *    COLLECTION REQUESTS
// *      POST ADD A NEW SURF SPOT
// *      GET GET ALL SURF SPOTS
// *
// *    SURF COMMENTS
// *      DEL DELETE COMMENT
// *      POST CREATE COMMENT
// *

