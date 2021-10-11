const router = require('express').Router();
const subCategoryController = require('../controller/subCategoryController');

router.get('/', subCategoryController.getAllSubCategorys);
router.get('/:id', subCategoryController.getSubCategoryById);
router.get('/category/:categoryId', subCategoryController.getSubCategoryByCategoryId);
router.post('/', subCategoryController.createSubCategory);
router.put('/:id', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;
