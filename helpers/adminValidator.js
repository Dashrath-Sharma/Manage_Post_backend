const { check } = require('express-validator');

exports.addPermissionValidator = [
    check('permission_name','Permission is required').not().isEmpty()
]

exports.deletePermissionValidator = [
    check('id','ID is required').not().isEmpty()
]

exports.updatePermissionValidator = [
    check('id','ID is required').not().isEmpty(),
    check('permission_name','Permission is required').not().isEmpty()
]