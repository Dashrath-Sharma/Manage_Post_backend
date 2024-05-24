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
            permissionObj.is_default = parseInt(req.body.default);
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

const getPermission = async(req, res) => {
    try{

        const permissions = await Permission.find({});

        return res.status(200).json({
            success:true,
            msg: 'Permissions Fetched Successfully',
            data: permissions
        });

    }catch(error){

        return res.status(400).json({
            success:false,
            msg:error.message
        })

    }
}

const deletePermission = async(req, res) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { id } = req.body;

        const isID = await Permission.findOne({ _id: id });

        if(!isID){
            return res.status(400).json({
                success:false,
                msg:"ID not found"
            })
        }

        await Permission.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success:true,
            msg:"Permission Deleted Successfully"
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

const updatePermission = async(req, res) => {

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:"Errors",
                errors:errors.array()
            });
        }

        const { id, permission_name } = req.body;

        const isID = await Permission.findOne({ _id: id });

        if(!isID){
            return res.status(400).json({
                success:false,
                msg:"Permission does not exist"
            });
        }

        const permissionNameExists = await Permission.findOne({
            _id: {$ne: id },
            permission_name
        });

        if(permissionNameExists){
            return res.status(400).json({
                success:false,
                msg:"Permission name is already assigned"
            })
        }

        const permissionObj = {
            permission_name
        }

        if(req.body.default != null){
            permissionObj.is_default = parseInt(req.body.default);
        }

        const updatedData = await Permission.findByIdAndUpdate({ _id: id }, { $set: permissionObj }, { new: true });

        return res.status(200).json({
            success:true,
            msg:"Permission Updated Successfully",
            data:updatedData
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }

}

module.exports = {
    addPermission,
    getPermission,
    deletePermission,
    updatePermission,
}