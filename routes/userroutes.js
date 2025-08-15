const express =require('express');
const path =require('path');
const fs =require('fs');
const router = express.Router();
const usercontroller =require('../controller/usercontroller');
const { route } = require('../../app');
const upload = require('../utils/multer');
const authentication=require('../middlwware/userAuth')

router.post('/register',usercontroller.register)  
router.get('/get',usercontroller.getUsers)

router.get('/gr/:user_id', usercontroller.getUsersById)
router.delete('/delet',usercontroller.deletUser)
router.put('/update',usercontroller.updateUser)    //  Multer Route to upadate file  upload.single('image')
// router.put('/upadted',usercontroller.postUpdate) 

// router.post('/post', usercontroller.post)
// router.get('/post', usercontroller. getPost)
// router.get('/id',usercontroller.PostById)
// router.put('/upid',upload.single('image'), usercontroller.updatePost)

router.post('/log',usercontroller.loginuser)

//product Routes,
// router.post('/Product', usercontroller.regProduct) 


module.exports=router;