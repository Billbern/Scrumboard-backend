const { mongoose } = require('../config/db');

// create instance of database connection Schema
const Schema = mongoose.Schema;

// create an actual schema
const UserSchema = new Schema({
    username: String, 
    email: String, 
    password: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

// add to database models
module.exports = mongoose.model("User", UserSchema);
