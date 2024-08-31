//Each task should have a title, description, and status (e.g., To Do, In Progress, Done)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type: String
    },
    password :{
       type: String
    }

})

const userModel = mongoose.model("user" ,userSchema);
module.exports = userModel;