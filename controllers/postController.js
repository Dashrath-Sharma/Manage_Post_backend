const Post = require('../models/postModel');
const { validationResult } = require('express-validator');

const createPost = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                error:errors.array()
            });
        }

        const { title, description } = req.body;

        const obj = {
            title,
            description
        }

        if(req.body.categories){
            obj.categories = req.body.categories;
        }

        const post = new Post( obj );
        const newPost = await post.save();
        const postFullData = await Post.findOne({ _id: newPost._id }).populate('categories');

        return res.status(200).json({
            success:true,
            msg:"Post Created Successfully",
            data:postFullData
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

const getPosts = async(req, res) => {
    try{

        const posts = await Post.find({}).populate('categories');

        return res.status(200).json({
            success:true,
            msg:"Fetched Posts Successfully",
            data:posts
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

const deletePost = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:"errors",
                error:errors.array()
            });
        }

        const isId = await Post.findOne({ _id: id });

        if(!isId){
            return res.status(400).json({
                success:false,
                msg:"ID not found"
            });
        }

        const deletedData = await Post.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success:true,
            msg:"Post Deleted Successfully"
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

const updatePost = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'errors',
                error:errors.array()
            });
        }

        const { id, title, description } = req.body;

        const isId = await Post.findOne({ _id: id });

        if(!isId){
            return res.status(400).json({
                success:false,
                msg:"Post not found"
            });
        }

        const obj = {
            title,
            description
        }

        if(req.body.categories){
            obj.categories = req.body.categories
        }

        const updatedPost = await Post.findByIdAndUpdate({ _id: id }, { $set: obj }, { new: true}).populate('categories');

        return res.status(200).json({
            success:true,
            msg:"Post updated successfully",
            data:updatedPost
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

module.exports = {
    createPost,
    getPosts,
    deletePost,
    updatePost
}