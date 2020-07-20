
process.env.NODE_ENV = 'test';
process.env.ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const server = require("../../index");
const { Applicant } = require('../../models');
const should = chai.should();
chai.use(chaiHttp);

describe('REST: Applicant', () => {
  before((done) => {
    // wait for myssql connection
    setTimeout(() => {
      done();
    }, 500)
  });

  describe('/GET Applicants', () => {
      let id = null;
      let item = null;
      it('it should GET many Applicants', (done) => {
        chai.request(server)
          .get('/applicants?limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('applicants');
            res.body.applicants.should.be.array();
            if (res.body.applicants.length > 0 && res.body.applicants[0].id) id = res.body.applicants[0].id
            done();
          });
      });
      it('it should GET one Applicants', (done) => {
        if (id) {
          chai.request(server)
            .get(`/applicant/${id}`)
            .end((err, res) => {
              res.should.have.status(200);
              item = res.body.applicant
              res.body.should.have.property('applicant');
              done();
            });
        } else {
          done();
        }
      });
      // @TODO put, post
  });
});
