const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { successRes, errorRes } = require('../utils/response');
const Post = require('../models/post');

//  Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, tags, isPublished, author } = req.body;

    const newPost = new Post({
      title,
      content,
      tags,
      author,
      isPublished,
    });

    await newPost.save();
    return successRes(res, 200, "Post created successfully", { post: newPost }, 200);
  } catch (error) {
    console.log("Create Post Error:", error);
    return errorRes(res, 500, "Internal Server Error");
  }
};

//  Get all posts (with optional limit and skip)
const getAllPosts = async (req, res) => {
  try {
    const { limit = 10, start = 0 } = req.query;
    const posts = await Post.find().limit(Number(limit)).skip(Number(start));
    return successRes(res, 200, "Posts fetched", { posts }, 200);
  } catch (error) {
    console.log("Get All Posts Error:", error);
    return errorRes(res, 500, "Internal Server Error");
  }
};

//

const getPostById = async (req, res) => {
  try {
    const { post_id } = req.query;
    const post = await Post.findById(post_id);
    if (!post) {
      return errorRes(res, 404, "Post not found");
    }
    return successRes(res, 200, "Post found", { post }, 200);
  } catch (error) {
    console.log("Get Post by ID Error:", error);
    return errorRes(res, 500, "Internal Server Error");
  }
};

// ✅ Update a post by ID
const updatePost = async (req, res) => {
  try {
    const { post_Id } = req.query;
    const updateData = req.body;

    if (!post_Id) {
      return errorRes(res, 400, "post_Id is required");
    }

    const updatedPost = await Post.findByIdAndUpdate(post_Id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return errorRes(res, 404, "Post not found");
    }

    return successRes(res, 200, "Post updated", { post: updatedPost }, 200);
  } catch (error) {
    console.log("Update Post Error:", error);
    return errorRes(res, 500, "Internal Server Error");
  }
};


const deletePost = async (req, res) => {
  try {
    const { post_id } = req.query;
    const post = await Post.findByIdAndDelete(post_id);
    if (!post) {
      return errorRes(res, 404, "Post not found");
    }
    return successRes(res, 200, "Post deleted", { post }, 200);
  } catch (error) {
    console.log("Delete Post Error:", error);
    return errorRes(res, 500, "Internal Server Error");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
