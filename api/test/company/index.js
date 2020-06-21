
process.env.NODE_ENV = 'test';
process.env.ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const server = require("../../index");
const { Company } = require('../../models');
const should = chai.should();
chai.use(chaiHttp);

describe('REST: Company', () => {
  before((done) => {
    // wait for myssql connection
    setTimeout(() => {
      done();
    }, 500)
  });

  describe('/GET Companys', () => {
      let id = null;
      let item = null;
      it('it should GET many Companys', (done) => {
        chai.request(server)
          .get('/companys?limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('companys');
            res.body.companys.should.be.array();
            if (res.body.companys.length > 0 && res.body.companys[0].id) id = res.body.companys[0].id
            done();
          });
      });
      it('it should GET one Companys', (done) => {
        if (id) {
          chai.request(server)
            .get(`/company/${id}`)
            .end((err, res) => {
              res.should.have.status(200);
              item = res.body.company
              res.body.should.have.property('company');
              done();
            });
        } else {
          done();
        }
      });
      // @TODO put, post
  });
});
