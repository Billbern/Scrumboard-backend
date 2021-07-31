const { mongoose } = require('../config/db');

// create instance of database connection Schema
const Schema = mongoose.Schema;

// create an actual schema
const TaskSchema = new Schema({
    id: String, 
    title: String, 
    author: String, 
    tag: String,  
    timed: Date , 
    reward: String, 
    stage: String
});

// add to database models
module.exports = mongoose.model("Task", TaskSchema);
