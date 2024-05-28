const Role = require('../../models/roleModel');
const { validationResult } = require('express-validator');

const createRole = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                error:errors.array()
            });
        }

        const { role_name, value } = req.body;

        const ifRole = await Role.findOne({ role_name });

        if(ifRole){
            return res.status(400).json({
                success:false,
                msg:"Role already exists"
            });
        }

        const role = new Role({ role_name, value });

        const newRole = await role.save();

        return res.status(200).json({
            success:true,
            msg:"Role Created Successfully",
            data:newRole
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

const getRoles = async(req, res) => {
    try{

        const roles = await Role.find({});

        return res.status(200).json({
            success:true,
            msg:"Roles Fetched Successfully",
            data:roles
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

module.exports = {
    createRole,
    getRoles
}