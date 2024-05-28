const express = require('express');

const router = express();

const auth = require('../middlewares/authMiddleware');

const { adminAccess } = require('../middlewares/adminMiddleware');

const permissionController = require('../controllers/admin/permissionController');
const roleController = require('../controllers/admin/roleController');

const {
    addPermissionValidator,
    deletePermissionValidator,
    updatePermissionValidator,
    createRoleValidator
} = require('../helpers/adminValidator');

// ADMIN PERMISSION ROUTES
router.post('/add-permission', auth, adminAccess, addPermissionValidator, permissionController.addPermission);
router.get('/get-permissions', auth, adminAccess, permissionController.getPermission);
router.post('/delete-permission', auth, adminAccess, deletePermissionValidator, permissionController.deletePermission);
router.post('/update-permission', auth, adminAccess, updatePermissionValidator, permissionController.updatePermission);

// ADMIN ROLE ROUTES

router.post('/create-role', auth, adminAccess, createRoleValidator, roleController.createRole);
router.post('/get-roles', auth, adminAccess, roleController.getRoles);


module.exports = router;