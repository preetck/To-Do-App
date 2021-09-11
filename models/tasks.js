const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    task_name:{
        type:String,
        required:true
    },
    task_created:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

const Tasks = mongoose.model('task',taskSchema);
module.exports = Tasks;