const { check } = require('express-validator');

// CATEGORY VALIDATORS

exports.addCategoryValidator = [
    check('category_name','Category name is required').not().isEmpty()
];

exports.deleteCategoryValidator = [
    check('id', 'id is required').not().isEmpty()
];

exports.updateCategoryValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('category_name', 'Category name is required').not().isEmpty()
];


// POST VALIDATORS

exports.createPostValidator = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
]

exports.deletePostValidator = [
    check('id', 'id is required').not().isEmpty()
]

exports.updatePostValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
]