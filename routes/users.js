var express = require('express');
var router = express.Router();
// user CRUD middleware
const { register, list, remove, login, logout, isAuth } = require('../controllers/users')
// auth middleware
const { auth } = require('../middleware/auth')

// get users list
router.get('/', auth, list)
// delete user
router.delete('/', auth, remove)

// user register and login
router.post('/', auth, register);
router.post('/login', login)

router.get('/logout', auth, logout)
router.get('/isAuth', isAuth)

module.exports = router;
