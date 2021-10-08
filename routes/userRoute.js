const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const userController = require('../controller/userController');

router.get('/:id', authenticate, userController.getUserById);
router.put('/edit/:id', authenticate, userController.updateUser);
router.delete('/edit/:id', authenticate, userController.deleteUser);

module.exports = router;
