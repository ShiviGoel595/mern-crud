const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel.js');
const taskModel = require('../model/taskModel.js');
const authtoken = require('../middleware/auth.js');
//const userController = require("../controller/userController.js")
//console.log(userController);
//router.post('/user/register', userController.userRegistration);
//router.post('/user/login', userController.userLogin);



router.post('/', async (req, res, next) => {
    res.send('Server is running and receiving requests . Enter api endpoint to further test')
})

router.post('/user_register', async (req, res, next) => {
    const {email ,password} = req.body;
    try {
        if(email&&password){
            const isUser = await userModel.findOne({email:email});
            if(!isUser){
              const genSalt  = await bcryptjs.genSalt(10);
              const hashPassword = await bcryptjs.hash(password, genSalt)
              const newUser = new userModel({
                email : email,
                password:hashPassword
              })

              const saveUser = await newUser.save();
              if(saveUser){
                return res.status(200).json({message:"New user registered"});

              }

            }
            else{
                return res.status(400).json({message:"email already registered"});

            }
        }
        else{
            return res.status(400).json({message:"all fields are required"});
        }
      }
      catch(err) {
        return res.status(400).json({message:err.message})
      }   
   
})



router.post('/user_login', async (req, res, next) => {
    const {email ,password} = req.body;
    try {
        if(email&&password){
            const isEmail = await userModel.findOne({email:email});

            if(isEmail){
                if(isEmail.email === email &&  await bcryptjs.compare(password ,isEmail.password)){
                     // GENERATING TOKEN JWT AUTHENTICATION
                     
                     const token = jwt.sign({ userID : isEmail._id },'top_secret', {expiresIn :"10d"});
                     return res.status(200).json({
                        message:"Login Succesful",
                        token :token,
                        email:isEmail.email
                     });

                }
                else{
                    return res.status(400).json({message:"wrong credentials"});

                }

            }
            else{
                return res.status(400).json({message:"NO account with this email exits.Please register yourself"});
            }
        }
        else{
            return res.status(400).json({message:"all fields are required"});

        }
    }

        catch(err) {
            return res.status(400).json({message:err.message})
          } 
    res.send('user login sucessful');
})

//************************************************************************* */

//PROTECTED ROUTES , ONLY AFTER USER IS LOGIN

router.get('/get_tasks', authtoken.isUserAuthenticate , async (req, res, next) => {
//router.get('/get_tasks', async (req, res, next) => {
    try{
        const fetchAllTasks = await taskModel.find({});
        return res.status(200).json(fetchAllTasks);

    }
    catch(err) {
        return res.status(400).json({message:err.message})
    } 
})
router.post('/add_task', authtoken.isUserAuthenticate , async (req, res, next) => {
//router.post('/add_task', async (req, res, next) => {
   
    const{title, description, status} = req.body;
    try{

        if(title&&description&&status){
            const newTask = new taskModel({
                title :title ,
                description:description,
                status:status
              })

              const saveTask = await newTask.save();
              if(saveTask){
                return res.status(200).json({message:"New task added"});

              }

        }
        else{
            return res.status(400).json({message:"all fields are required"});

        }
    }
    catch(err) {
        return res.status(400).json({message:err.message})
    } 


})
router.get('/get_task/:id', authtoken.isUserAuthenticate ,async (req, res, next) => {
//router.get('/get_task/:id', async (req, res, next) => {
    const {id} = req.params;
    try{
        if(id){
            const fetchtaskByID = await taskModel.findById(id);
            return res.status(200).json(fetchtaskByID);
        }
        else{
            return res.status(400).json({message:"INVALID url / invalid ID"});
        }

    }
    catch(err) {
        return res.status(400).json({message:err.message})
    } 

})
router.put('/update_task/:id', authtoken.isUserAuthenticate ,async (req, res, next) => {
//router.put('/update_task/:id', async (req, res, next) => {
    const {id} = req.params;
    try{
        if(id){
            const updatetaskByID = await taskModel.findByIdAndUpdate(id, req.body,{new: true});
            return res.status(200).json(updatetaskByID);
        }
        else{
            return res.status(400).json({message:"INVALID url / invalid ID"});
        }

    }
    catch(err) {
        return res.status(400).json({message:err.message})
    }

})
router.delete('/delete_task/:id', authtoken.isUserAuthenticate ,async (req, res, next) => {
//router.delete('/delete_task/:id', async (req, res, next) => {
    const {id} = req.params;
    try{
        if(id){
            const deletetaskByID = await taskModel.findByIdAndDelete(id);
            return res.status(200).json(deletetaskByID);
        }
        else{
            return res.status(400).json({message:"INVALID url / invalid ID"});
        }

    }
    catch(err) {
        return res.status(400).json({message:err.message})
    }

})


module.exports = router; 