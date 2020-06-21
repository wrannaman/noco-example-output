const express = require('express');
const router = express.Router();
const {
  hook,
  attachUser,
  maybeAttachUser
} = require('../middleware');

const {
  createApplicant,
  getOneApplicant,
  getManyApplicant,
  updateApplicant,
  deleteApplicant,
} = require('../controllers/applicant');

router.post('/applicant', maybeAttachUser, hook, createApplicant);
router.get('/applicants', attachUser, hook, getManyApplicant);
router.get('/applicant/:id', attachUser, hook, getOneApplicant);
router.put('/applicant/:id', attachUser, hook, updateApplicant);
router.delete('/applicant/:id', attachUser, hook, deleteApplicant);

module.exports = router;