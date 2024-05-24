const express = require('express');

const router = express();

const auth = require('../middlewares/authMiddleware');

const permissionController = require('../controllers/admin/permissionController');

const { addPermissionValidator, deletePermissionValidator, updatePermissionValidator } = require('../helpers/adminValidator');

router.post('/add-permission', auth, addPermissionValidator, permissionController.addPermission);
router.get('/get-permissions', auth, permissionController.getPermission);
router.post('/delete-permission', auth, deletePermissionValidator, permissionController.deletePermission);
router.post('/update-permission', auth, updatePermissionValidator, permissionController.updatePermission);

module.exports = router;