//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const path    = require('path');

//Require the dev-dependencies
let chai      = require('chai');
let chaiHttp  = require('chai-http');
let server    = require(path.join(__dirname, '..', 'app.js'));
let should    = chai.should();

chai.use(chaiHttp);

describe('ddnsServer Test', () => {
  describe('/GET update', () => {
    it('it should run an update request', (done) => {
      chai.request(server)
        .get('/update?hostname=test.ddns.kyro.space&myip=10.10.10.10')
        //.send({hostname : "test.ddns.kyro.space", myip : "10.10.10.10"})
        .auth('kyromoto', '12345')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
});
