const { mongoose } = require('../config/db');

// create instance of database connection Schema
const Schema = mongoose.Schema;

// create an actual schema
const TaskSchema = new Schema({
    id: String, 
    title: String, 
    tag: String,  
    timed: Date, 
    reward: String, 
    stage: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true });

// add to database models
module.exports = mongoose.model("Task", TaskSchema);
