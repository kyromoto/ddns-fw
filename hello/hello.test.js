//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const path    = require('path');

//Require the dev-dependencies
let chai      = require('chai');
let chaiHttp  = require('chai-http');
let server    = require(path.join(__dirname, '..', 'app.js'));
let should    = chai.should();

chai.use(chaiHttp);

describe('hello Test', () => {
  describe('/GET hello', () => {
    it('it should run an hello request and have http status 200', (done) => {
      chai.request(server)
        .get('/hello')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
