const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const profileController = require('../controller/profileController');
const { upload } = require('../middleware/uploadFile');

router.get('/', authenticate, profileController.getProfileById);
router.put('/edit', authenticate, upload.single('imgUrl'), profileController.updateProfile);
router.put('/review/:id', authenticate, profileController.updateProfileReview);

module.exports = router;
