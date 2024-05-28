const { check } = require('express-validator');

// ADMIN PERMISSION VALIDATORS

exports.addPermissionValidator = [
    check('permission_name','Permission is required').not().isEmpty()
];

exports.deletePermissionValidator = [
    check('id','ID is required').not().isEmpty()
];

exports.updatePermissionValidator = [
    check('id','ID is required').not().isEmpty(),
    check('permission_name','Permission is required').not().isEmpty()
];

//  ROLE VALIDATORS

exports.createRoleValidator = [
    check('role_name', 'Role Name is required').not().isEmpty(),
    check('value','Value is required').not().isEmpty()
];