const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

var url = 'mongodb://localhost:27017/mean_3_period'

module.exports = function (callback) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err)
    console.log('Connected correctly to server')
    callback(db)
  })
}
