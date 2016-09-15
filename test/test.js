/* eslint-env mocha */
process.env.NODE_ENV = 'test'

const Jokes = require('../models/jokes')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Jokes', () => {
  describe('/GET jokes', () => {
    it('it should GET all the jokes', (done) => {
      chai.request(server)
        .get('/api/jokes')
        .end((err, res) => {
          if (err) return
          res.should.have.status(200)
          res.body.should.be.a('array')
          // res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  describe('/GET joke', () => {
    it('it should GET random joke', (done) => {
      chai.request(server)
        .get('/api/joke')
        .end((err, res) => {
          if (err) return
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.below(2)
          done()
        })
    })
    it('it should GET joke by id', (done) => {
      const id = '57daecf01939458cab6cb822'
      chai.request(server)
        .get('/api/jokes/' + id)
        .end((err, res) => {
          if (err) return
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body._id.should.be.eql(id)
          done()
        })
    })
  })

  describe('/POST joke', (done) => {
    it('it should POST joke', (done) => {
      chai.request(server)
        .post('/api/joke')
        .send({
          'joke': 'test joke haha'
        })
        .end((err, res) => {
          if (err) return
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.ok.should.be.eql(1)
          res.body.n.should.be.eql(1)
          done()
        })
    })
  })

  describe('/Delete joke', () => {
    let id
    beforeEach(function (done) {
      chai.request(server)
        .get('/api/joke')
        .end((err, res) => {
          if (err) return

          id = res.body[0]._id
          done()
        })
    })
    it('it should Delete joke by id', (done) => {
      chai.request(server)
        .delete('/api/joke')
        .send({
          id: id
        })
        .end((err, res) => {
          if (err) return
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.ok.should.be.eql(1)
          res.body.n.should.be.eql(1)
          done()
        })
    })
  })
})
