const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { successRes, errorRes } = require('../utils/response')
const User = require('../models/user')
const jwt=require('jsonwebtoken')
const sendEmail =require('../utils/sendEmail')

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const register = async (req, res) => {

    try {
        const {
            name,
            email,
            password,
            address,
            phn_number,
        } = req.body;

        const users = new User({  //new User({...}) creates it
            name,
            email,
            password,
            address,
            phn_numer: phn_number
        });

        await users.save(); //saves it to the MongoDB database


        const otp = generateOTP();

  sendEmail({
      email,
      html: "register",
      otp,
      user: { name },
      project_name: "MyApp",
    });




        return successRes(res, 200, "register user", { users }, 200)
    }
    catch (error) {
 console.log(error);
        return errorRes(res, 500, 'Internal Server Error')
    }
}

const getUsers = async (req, res) => {

    try {

        const user = await User.find()
        return successRes(res, 200, "get users", { user }, 200)
    }

    catch (error) {
 console.log(error);
        return errorRes(res, 500, 'Internal Server Error')
    }

}

const getUsersById = async (req, res) => {
    try {
const  {user_id}  = req.params;
        console.log(user_id, "user_id")
        const user = await User.findById(user_id)
        return successRes(res, 200, "get users", { user }, 200)

    } catch (error) {
        console.log(error);
        return errorRes(res, 500, 'Internal Server Error')
    }
}

const deletUser = async (req, res) => {
    try {
        const { user_id } = req.query;
        const user = await User.findByIdAndDelete(user_id)
        return successRes(res, 200, "User deleted", { user }, 200)

    } catch (error) {

    }

}

const updateUser = async (req, res) => {
    try {
        const { user_id } = req.query;
        const { username, email, password, phn_number } = req.body;
        const file=req.file; //uploading file using Multar

        const user = await User.findById(user_id)
        console.log(user, "user")
        user.name = username;
        user.email = email;
        user.image=file.filename; //Multar
        await user.save();
        return successRes(res, 200, "updated", { user }, 200)

    } catch (error) {
        console.log(error);
        return errorRes(res, 500, 'Internal Server Error')
    }
}


const loginuser =async(req,res)=>{
    try{

        const{email,password}=req.body;

        if(!email | !password){
            return errorRes(res,400,"email and password are required",{},400);
        }
        const user=await User.findOne({email});

        if(!user){
            return errorRes(res,400,"user not found",{},400)
        }

        // const ispasswordmatched=await 

        if(!password === user.password ){
            return errorRes(res,400,"password is incorrect",{},400)
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        return successRes(res,200,"login",{user,token},200)
        
    }catch(error){
        console.log(error,"error ")
        return errorRes(res,500,"internal server error ");
    }
}


module.exports = {

    register,
    getUsers,
    getUsersById,
    deletUser,
    updateUser,
    loginuser,
                
}


