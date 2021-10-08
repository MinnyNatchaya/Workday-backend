const router = require('express').Router();
const authController = require('../controller/authController');

router.post('/signup', authController.signup);
router.post('/signup-worker', authController.signupWorker);
router.post('/login', authController.login);

// router.post('/profile-edit',userController)

module.exports = router;
