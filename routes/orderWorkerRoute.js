const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const orderWorkerController = require('../controller/orderWorkerController');

router.get('/', authenticate, orderWorkerController.getAllOrderItem);
router.get('/category/:subCategoryId', authenticate, orderWorkerController.getOrderItemBySubCategoryId);
// router.get('/:id', authenticate, orderWorkerController.getOrderItemById);
// router.post('/create/:subCategoryId', authenticate, orderWorkerController.createOrderItem);
router.put('/acceptwork/:id', authenticate, orderWorkerController.updateOrderItem);
router.put('/cancle/:id', authenticate, orderWorkerController.updateOrderItemCancle);
router.put('/review/:id', authenticate, orderWorkerController.updateOrderItemReview);

router.put('/cancleSlip/:id', authenticate, orderWorkerController.updateCancleSlip);
router.put('/finishWork/:id', authenticate, orderWorkerController.updateFinishWork);

// router.delete('/:id', authenticate, orderWorkerController.deleteOrderItem);
// service-type-worker/edit/:1
module.exports = router;
