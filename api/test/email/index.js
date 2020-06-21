
process.env.NODE_ENV = 'test';
process.env.ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const server = require("../../index");
const { Email } = require('../../models');
const should = chai.should();
chai.use(chaiHttp);

describe('REST: Email', () => {
  before((done) => {
    // wait for myssql connection
    setTimeout(() => {
      done();
    }, 500)
  });

  describe('/GET Emails', () => {
      let id = null;
      let item = null;
      it('it should GET many Emails', (done) => {
        chai.request(server)
          .get('/emails?limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('emails');
            res.body.emails.should.be.array();
            if (res.body.emails.length > 0 && res.body.emails[0].id) id = res.body.emails[0].id
            done();
          });
      });
      it('it should GET one Emails', (done) => {
        if (id) {
          chai.request(server)
            .get(`/email/${id}`)
            .end((err, res) => {
              res.should.have.status(200);
              item = res.body.email
              res.body.should.have.property('email');
              done();
            });
        } else {
          done();
        }
      });
      // @TODO put, post
  });
});
