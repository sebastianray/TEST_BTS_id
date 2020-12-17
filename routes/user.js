const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/user')
const { authorization } = require('../middlewares/auth')

router.get('/all', authorization, UserController.getAllUser)
router.post('/signin', UserController.signIn)
router.post('/signup', UserController.signUp)


module.exports = router;