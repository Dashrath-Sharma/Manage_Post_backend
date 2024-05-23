const Permission = require('../../models/permissionModel');
const { validationResult } = require('express-validator');

const addPermission = async(req, res) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg: "Errors",
                errors:errors.array()
            });
        }

        const { permission_name } = req.body;
        const permissionExists = await Permission.findOne({ permission_name });

        if(permissionExists){
            return res.status(400).json({
                success:false,
                msg: 'Permission already exists!'
            });
        }

        const permissionObj = {
            permission_name
        }

        if(req.body.default != null){
            permissionObj.is_default = req.body.default;
        }

        const permission = new Permission(permissionObj);
        const newPermission = await permission.save(); 
        
        return res.status(200).json({
            success:true,
            msg: "Permission Added Successfully!",
            data: newPermission
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg: error.message
        });
    }
}

module.exports = {
    addPermission
}