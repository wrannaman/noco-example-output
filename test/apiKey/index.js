
process.env.NODE_ENV = 'test';
process.env.ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const server = require("../../index");
const { ApiKey } = require('../../models');
const should = chai.should();
chai.use(chaiHttp);

describe('REST: ApiKey', () => {
  before((done) => {
    // wait for myssql connection
    setTimeout(() => {
      done();
    }, 500)
  });

  describe('/GET ApiKeys', () => {
      let id = null;
      let item = null;
      it('it should GET many ApiKeys', (done) => {
        chai.request(server)
          .get('/apiKeys?limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('apiKeys');
            res.body.apiKeys.should.be.array();
            if (res.body.apiKeys.length > 0 && res.body.apiKeys[0].id) id = res.body.apiKeys[0].id
            done();
          });
      });
      it('it should GET one ApiKeys', (done) => {
        if (id) {
          chai.request(server)
            .get(`/apiKey/${id}`)
            .end((err, res) => {
              res.should.have.status(200);
              item = res.body.apiKey
              res.body.should.have.property('apiKey');
              done();
            });
        } else {
          done();
        }
      });
      // @TODO put, post
  });
});
