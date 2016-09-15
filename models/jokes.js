const mongoDbConnection = require('../db')
const ObjectId = require('mongodb').ObjectId

exports.allJokes = function (callback) {
  mongoDbConnection(function (db) {
    var collection = db.collection('jokes')
    collection.find({}).toArray(function (err, jokes) {
      callback(err, jokes)
      db.close()
    })
  })
}
exports.findJoke = function (id, callback) {
  mongoDbConnection(function (db) {
    var collection = db.collection('jokes')
    collection.findOne({
      '_id': ObjectId(id)
    }, function (err, joke) {
      callback(err, joke)
      db.close()
    })
  })
}
exports.addJoke = function (jokeToAdd, callback) {
  mongoDbConnection(function (db) {
    var collection = db.collection('jokes')
    collection.insertOne({
      joke: jokeToAdd
    }, function (err, result) {
      callback(err, result)
      db.close()
    })
  })
}
exports.editJoke = function (jokeToEdit, callback) {
}
exports.deleteJoke = function (id, callback) {
  mongoDbConnection(function (db) {
    var collection = db.collection('jokes')
    collection.deleteOne({
      _id: ObjectId(id)
    }, function (err, result) {
      callback(err, result)
      db.close()
    })
  })
}
exports.randomJoke = function (callback) {
  mongoDbConnection(function (db) {
    var collection = db.collection('jokes')
    var n = collection.count({})
    var r = Math.floor(Math.random() * n)
    collection.find({}).limit(1).skip(r).toArray(function (err, jokes) {
      callback(err, jokes)
      db.close()
    })
  })
}
