const express = require('express');
const router = express.Router();
const {
  hook,
  attachUser,
  maybeAttachUser
} = require('../middleware');

const {
  createEmail,
  getOneEmail,
  getManyEmail,
  updateEmail,
  deleteEmail,
} = require('../controllers/email');

router.post('/email', attachUser, hook, createEmail);
router.get('/emails', attachUser, hook, getManyEmail);
router.get('/email/:id', attachUser, hook, getOneEmail);
router.put('/email/:id', attachUser, hook, updateEmail);
router.delete('/email/:id', attachUser, hook, deleteEmail);

module.exports = router;