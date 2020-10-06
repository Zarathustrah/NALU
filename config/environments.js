const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/surfsUp-db'
const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'shhhh its a secret'

module.exports = {
  dbURI,
  port,
  secret
}