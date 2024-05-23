const express = require('express');

const router = express();

const permissionController = require('../controllers/admin/permissionController');

const { addPermissionValidator } = require('../helpers/adminValidator');

router.post('/add-permission', addPermissionValidator, permissionController.addPermission);

module.exports = router;