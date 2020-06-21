const express = require('express');
const router = express.Router();

const {
  hook,
  attachUser
} = require('../middleware');

const {
  deleteMedia,
  getMedia,
  getPresignedURL,
  makePublic
} = require('../controllers/media');

router.get('/media/file', attachUser, hook, getMedia);
router.get('/media/presigned', attachUser, hook, getPresignedURL);
router.get('/media/public', attachUser, hook, makePublic);
router.delete('/media', attachUser, hook, deleteMedia);
module.exports = router;
