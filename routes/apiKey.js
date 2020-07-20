const express = require('express');
const router = express.Router();
const {
  hook,
  attachUser,
  maybeAttachUser
} = require('../middleware');

const {
  createApiKey,
  getOneApiKey,
  getManyApiKey,
  updateApiKey,
  deleteApiKey,
} = require('../controllers/apiKey');

router.post('/apiKey', attachUser, hook, createApiKey);
router.get('/apiKeys', attachUser, hook, getManyApiKey);
router.get('/apiKey/:id', attachUser, hook, getOneApiKey);
router.put('/apiKey/:id', attachUser, hook, updateApiKey);
router.delete('/apiKey/:id', attachUser, hook, deleteApiKey);

module.exports = router;