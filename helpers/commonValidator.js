const { check } = require('express-validator');

exports.addCategoryValidator = [
    check('category_name','Category name is required').not().isEmpty()
]

exports.deleteCategoryValidator = [
    check('id', 'id is required').not().isEmpty()
]

exports.updateCategoryValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('category_name', 'Category name is required').not().isEmpty()
]