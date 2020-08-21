const SurfSpot = require('../models/surfSpot')
const { notFound, unauthorized } = require('../lib/errorMessage')

async function surfSpotsIndex(req, res, next) {
  try {
    const surfSpots = await SurfSpot.find().populate('user')
    if (!surfSpots) throw new Error(notFound)
    res.status(200).json(surfSpots)
    console.log(surfSpots)
  } catch (err) {
    next(err)
  }
}

async function surfSpotsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser._id
    const createdSurfSpot = await SurfSpot.create(req.body)
    res.status(201).json(createdSurfSpot)
  } catch (err) {
    next(err)
  }
}

async function surfSpotsShow(req, res, next) {
  try {
    const surfSpot = await SurfSpot.findById(req.params.id).populate('user').populate('comments.user')
    if (!surfSpot) throw new Error(notFound)
    res.status(200).json(surfSpot)
  } catch (err) {
    next(err)
  }
}

async function surfSpotsEdit(req, res, next) {
  try {
    const editedSurfSpot = await SurfSpot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!editedSurfSpot) throw new Error(notFound)
    res.status(202).json(editedSurfSpot)
  } catch (err) {
    next(err)
  }
}

async function surfSpotsDelete(req, res, next) {
  try {
    const surfSpot = await SurfSpot.findByIdAndDelete(req.params.id)
    if (!surfSpot) throw new Error(notFound)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function surfSpotsCommentCreate(req, res, next) {
  try {
    const surfSpot = await SurfSpot.findById(req.params.id)
    if (!surfSpot) throw new Error(notFound)
    const commentBody = req.body
    commentBody.user = req.currentUser._id
    surfSpot.comments.push(commentBody)
    await surfSpot.save()
    res.status(201).json(surfSpot)
  } catch (err) {
    next(err)
  }
}

async function surfSpotsCommentDelete(req, res, next) {
  try {
    const surfSpot = await SurfSpot.findById(req.params.id)
    if (!surfSpot) throw new Error(notFound)
    const commentToDelete = surfSpot.comments.id(req.params.commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await commentToDelete.remove()
    await surfSpot.save()
    res.status(202).json(surfSpot)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: surfSpotsIndex,
  create: surfSpotsCreate,
  show: surfSpotsShow,
  edit: surfSpotsEdit,
  delete: surfSpotsDelete,
  commentCreate: surfSpotsCommentCreate,
  commentDelete: surfSpotsCommentDelete
}