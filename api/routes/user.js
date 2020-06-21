const express = require('express');
const router = express.Router();
const {
  hook,
  attachUser,
  maybeAttachUser
} = require('../middleware');

const {
  createUser,
  getOneUser,
  getManyUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.post('/user', attachUser, hook, createUser);
router.get('/users', attachUser, hook, getManyUser);
router.get('/user/:id', attachUser, hook, getOneUser);
router.put('/user/:id', attachUser, hook, updateUser);
router.delete('/user/:id', attachUser, hook, deleteUser);

module.exports = router;