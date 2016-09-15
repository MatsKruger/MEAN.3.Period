var express = require('express')
var router = express.Router()
var Jokes = require('../models/jokes')

/* GET jokes. */
router.get('/jokes', function (req, res, next) {
  Jokes.allJokes(function (err, response) {
    if (err) return
    res.json(response)
  })
})

/* GET jokes. */
router.get('/jokes/:id', function (req, res, next) {
  Jokes.findJoke(req.params.id, function (err, response) {
    if (err) res.json(err)
    res.json(response)
  })
})

/* GET random joke. */
router.get('/joke', function (req, res, next) {
  Jokes.randomJoke(function (err, response) {
    if (err) res.json(err)
    res.json(response)
  })
})

/* POST joke. */
router.post('/joke', function (req, res, next) {
  console.log(req.body);
  Jokes.addJoke(req.body.joke, function (err, response) {
    if (err) res.json(err)
    res.json(response)
  })
})

/* DELETE joke. */
router.delete('/joke', function (req, res, next) {
  Jokes.deleteJoke(req.body.id, function (err, response) {
    if (err) res.json(err)
    res.json(response)
  })
})

module.exports = router
