const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const orderController = require('../controller/orderController');

router.get('/', authenticate, orderController.getAllOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.post('/', authenticate, orderController.createOrder);
router.put('/:id', authenticate, orderController.updateOrder);
router.delete('/:id', authenticate, orderController.deleteOrder);

module.exports = router;
