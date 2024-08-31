//Each task should have a title, description, and status (e.g., To Do, In Progress, Done)

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title:{
        type: String
    },
    description :{
       type: String
    },

    status:{
        type: String
    },

})

const taskModel = mongoose.model("task" ,taskSchema);
module.exports = taskModel;