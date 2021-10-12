const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const orderItemController = require('../controller/orderItemController');

router.get('/', authenticate, orderItemController.getAllOrdersItem);
router.get('/:id', authenticate, orderItemController.getOrderItemById);
router.post('/create/:subCategoryId', authenticate, orderItemController.createOrderItem);
router.put('/edit/:id', authenticate, orderItemController.updateOrderItem);
router.delete('/:id', authenticate, orderItemController.deleteOrderItem);

module.exports = router;
