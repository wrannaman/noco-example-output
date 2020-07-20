
const express = require('express');
const router = express.Router();

const {
  hook,
  attachUser
} = require('../middleware');

const {
  verify,
  code,
  me,
} = require('../controllers/auth');

router.post('/auth', hook, verify);
router.get('/me', attachUser, hook, me);
router.get('/code', hook, code);
router.get('/healthz', (req, res) => res.json({ success: true }))

module.exports = router;
