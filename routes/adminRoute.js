const express = require('express');

const router = express();

const auth = require('../middlewares/authMiddleware');

const { adminAccess } = require('../middlewares/adminMiddleware');

const permissionController = require('../controllers/admin/permissionController');

const { addPermissionValidator, deletePermissionValidator, updatePermissionValidator } = require('../helpers/adminValidator');

router.post('/add-permission', auth, adminAccess, addPermissionValidator, permissionController.addPermission);
router.get('/get-permissions', auth, adminAccess, permissionController.getPermission);
router.post('/delete-permission', auth, adminAccess, deletePermissionValidator, permissionController.deletePermission);
router.post('/update-permission', auth, adminAccess, updatePermissionValidator, permissionController.updatePermission);

module.exports = router;