const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/signup', userController.signup);
router.post('/signup-worker', userController.signupWorker);
router.post('/login', userController.login);
// router.post('/profile-edit',userController)

module.exports = router;
