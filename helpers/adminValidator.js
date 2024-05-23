const { check } = require('express-validator');

exports.addPermissionValidator = [
    check('permission_name','Permission is required').not().isEmpty()
]