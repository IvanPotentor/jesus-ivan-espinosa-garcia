
const request = require('supertest');
const app = require('../app'); 
const expect = require('chai').expect;

describe('GET /api/products', () => {
  it('should return all products', (done) => {
    request(app)
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
