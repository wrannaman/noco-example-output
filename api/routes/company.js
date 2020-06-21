const express = require('express');
const router = express.Router();
const {
  hook,
  attachUser,
  maybeAttachUser
} = require('../middleware');

const {
  createCompany,
  getOneCompany,
  getManyCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/company');

router.post('/company', maybeAttachUser, hook, createCompany);
router.get('/companys', attachUser, hook, getManyCompany);
router.get('/company/:id', attachUser, hook, getOneCompany);
router.put('/company/:id', attachUser, hook, updateCompany);
router.delete('/company/:id', attachUser, hook, deleteCompany);

module.exports = router;