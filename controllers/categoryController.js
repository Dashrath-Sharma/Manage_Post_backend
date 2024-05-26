const Category = require('../models/categoryModel');
const { validationResult } = require('express-validator');

const addCategory = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                error:errors.array()
            });
        }

        const { category_name } = req.body;

        const isCategoryName = await Category.findOne({
            name:{
                $regex: category_name,
                $options:'i'
            }
        });

        if(isCategoryName){
            return res.status(400).json({
                success:false,
                msg:'Category already exists'
            });
        }

        const newCategory = new Category({ name: category_name });
        const categoryData = await newCategory.save();

        return res.status(200).json({
            success:true,
            msg:'Category Created Successfully!',
            data:categoryData
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

const getCategory = async(req, res) => {
    try{

        const categories = await Category.find({});

        return res.status(200).json({
            success:true,
            msg:"Categories Fetched Successfully.",
            data:categories
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

const deleteCategory = async(req, res) => {

    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                error:errors.array()
            });
        }

        const { id } = req.body;

        const ifCategory = await Category.findOne({ _id: id });

        if(!ifCategory){
            return res.status(400).json({
                success:false,
                msg:"Category not found",
            });
        }

        await Category.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success:true,
            msg:"Category Deleted Successfully",
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

const updateCategory = async(req, res) => {

    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                error:errors.array()
            });
        }

        const { id, category_name } = req.body;

        const isId = await Category.findOne({ _id:id });

        if(!isId){
            return res.status(400).json({
                success:false,
                msg:"Category Does not exist",
            });
        }

        const isCategory = await Category.findOne({
            _id: { $ne: id },
            name:{
                $regex:category_name,
                $options:'i'
            }
        });

        if(isCategory){
            return res.status(400).json({
                success:false,
                msg:"Category Already Exists"
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate( { _id:id }, { $set: { name: category_name }}, { new: true } );

        return res.status(200).json({
            success:true,
            msg:'Category updated successfully',
            data:updatedCategory
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }

}

module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}