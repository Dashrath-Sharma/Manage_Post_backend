const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');
const { 
    addCategoryValidator, 
    deleteCategoryValidator, 
    updateCategoryValidator,
    createPostValidator,
    deletePostValidator,
    updatePostValidator
 } = require('../helpers/commonValidator');

const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');

// CATEGORY ROUTES
router.post('/add-category', auth, addCategoryValidator, categoryController.addCategory);
router.post('/get-categories', auth, categoryController.getCategories);
router.post('/delete-category', auth, deleteCategoryValidator, categoryController.deleteCategory);
router.post('/update-category', auth, updateCategoryValidator, categoryController.updateCategory);

// POST ROUTES
router.post('/create-post',  auth, createPostValidator, postController.createPost);
router.post('/get-posts',  auth, postController.getPosts);
router.post('/delete-post',  auth, deletePostValidator, postController.deletePost);
router.post('/update-post',  auth, updatePostValidator, postController.updatePost);



module.exports = router;
