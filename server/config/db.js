const mongoose = require('mongoose');

const connectToMongo  = async() => {
    const res = await mongoose.connect('mongodb://localhost:27017/ProAssignment');
    if(res){ console.log("connected succesfully to mongodb")}

}

module.exports = connectToMongo;