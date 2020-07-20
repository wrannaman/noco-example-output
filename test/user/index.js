
process.env.NODE_ENV = 'test';
process.env.ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const server = require("../../index");
const { User } = require('../../models');
const should = chai.should();
chai.use(chaiHttp);

describe('REST: User', () => {
  before((done) => {
    // wait for myssql connection
    setTimeout(() => {
      done();
    }, 500)
  });

  describe('/GET Users', () => {
      let id = null;
      let item = null;
      it('it should GET many Users', (done) => {
        chai.request(server)
          .get('/users?limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('users');
            res.body.users.should.be.array();
            if (res.body.users.length > 0 && res.body.users[0].id) id = res.body.users[0].id
            done();
          });
      });
      it('it should GET one Users', (done) => {
        if (id) {
          chai.request(server)
            .get(`/user/${id}`)
            .end((err, res) => {
              res.should.have.status(200);
              item = res.body.user
              res.body.should.have.property('user');
              done();
            });
        } else {
          done();
        }
      });
      // @TODO put, post
  });
});
