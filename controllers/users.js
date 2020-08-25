const User = require('../models/user')
const { notFound, unauthorized } = require('../lib/errorMessage')

async function userIndex(req, res, next) {
  try {
    // console.log('I reached this stage')
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.log('Error is staged')
    next(err)
  }
}

async function userShow(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate('achievedSurfSpot')
    // ! start -> figure out the path
    // .populate('joinedGroups')
    // ! end
    // if (user.joinedGroups) {
    //   user.joinedGroups = user.joinedGroups.flatMap(item => item._id).reduce((arr, curr) => {
    //     if (arr.length === 0) {
    //       arr.push(curr)
    //     }
    //     if (!arr.find(item => item._id === curr._id)) {
    //       arr.push(curr)
    //     }
    //     return arr
    //   }, [])
    // }
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function userUpdate(req, res, next) {
  try {
    const userToUpdate = await User.findById(req.params.id)
    if (!userToUpdate) throw new Error(notFound)

    if (!userToUpdate.equals(req.currentUser._id)) throw new Error(unauthorized)

    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()

    res.status(202).json(userToUpdate)
  } catch (err) {
    next(err)
  }
}

async function userAchievedSurfSpotsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser

    const user = await User.findById(req.params.id)
    console.log('🛑 I have reached the currentUser 🛑')
    if (!user) throw new Error(notFound)
    console.log('🛑 Trying to read the method iteration 🛑')
    console.log(req.body.spot)
    if (user.achievedSurfSpots.some(spot =>  spot.spot.equals(req.body.spot))) throw new Error('Already added') 

    user.achievedSurfSpots.push(req.body)
    await user.save()

    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

//* DELETE URL: /profiles/:id/completed/:compId

async function userAchievedSurfSpotsDelete(req, res, next) {
  try {
    const achievedId = req.params.achievedId

    const user = await User.findById(req.params.id)
    if (!user) throw new Error(notFound)

    const achievedSurfSpotsToRemove = user.achievedSurfSpots.id(achievedId)
    if (!achievedSurfSpotsToRemove) throw new Error(notFound)


    if (!user.equals(req.currentUser._id)) throw new Error(unauthorized)

    await achievedSurfSpotsToRemove.remove()
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  userIndex,
  userShow,
  userUpdate,
  userAchievedSurfSpotsCreate,
  userAchievedSurfSpotsDelete
}