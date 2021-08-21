const mongoose = require('mongoose');

// try connecting to database uri
(async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, 
            useNewUrlParser: true, 
            useUnifiedTopology : true, 
            useFindAndModify: false 
        });
    } catch (err) {
        console.error(err);
    }    
})()

// establish connection
const connection = mongoose.connection;

// once connection is establish log data
connection.once('open', ()=>{
    console.log("MongoDb database connection established successfully");
})

module.exports = { mongoose, connection };