const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');
const { addCategoryValidator, deleteCategoryValidator, updateCategoryValidator } = require('../helpers/commonValidator');
const categoryController = require('../controllers/categoryController');

router.post('/add-category', auth, addCategoryValidator, categoryController.addCategory);
router.post('/get-categories', auth, categoryController.getCategory);
router.post('/delete-category', auth, deleteCategoryValidator, categoryController.deleteCategory);
router.post('/update-category', auth, updateCategoryValidator, categoryController.updateCategory);

module.exports = router;