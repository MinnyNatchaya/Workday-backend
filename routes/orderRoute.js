const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const orderItemController = require('../controller/orderItemController');
const { upload } = require('../middleware/uploadFile');

router.get('/', authenticate, orderItemController.getAllOrdersItem);
router.get('/:id', authenticate, orderItemController.getOrderItemById);

router.post('/create/:subCategoryId', authenticate, orderItemController.createOrderItem);

router.put('/edit/:id', authenticate, orderItemController.updateOrderItem);
router.put('/changeWorker/:id', authenticate, orderItemController.updateOrderItemChanheWorker);
router.put('/uploadSlip/:id', authenticate, upload.single('slipUrl'), orderItemController.updateOrderItemSlip);

router.delete('/:id', authenticate, orderItemController.deleteOrderItem);

module.exports = router;
