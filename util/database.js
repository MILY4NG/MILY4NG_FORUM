import { MongoClient } from 'mongodb'
const url = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.qudk7zv.mongodb.net/crud?retryWrites=true&w=majority`
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }