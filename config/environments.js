const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/SEI-project-3'
const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'shhhh its a secret'

module.exports = {
  dbURI,
  port,
  secret
}
