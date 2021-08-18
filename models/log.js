const { mongoose } = require('../config/db');

// create instance of database connection Schema
const Schema = mongoose.Schema;

// create an actual schema
const LogSchema = new Schema({
    message: String, 
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// add to database models
module.exports = mongoose.model("Log", LogSchema);
