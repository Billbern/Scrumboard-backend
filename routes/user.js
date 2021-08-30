const express = require('express');
const jwt = require('jsonwebtoken');
let route = express.Router();

// use json
route.use(express.json());

// get document model for accessing data
const User = require('../models/user');
const verifyToken = require('../utils/verifytoken');


// handle an edit request for a task
route.put('/profile', verifyToken, async (req, res)=>{
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            let updateUser =  await User.findOneAndUpdate({ _id: verifyUser.id },  req.body, {new: true});
            if(updateUser){
                res.status(200).json({ name: updateUser.username, mail: updateUser.email, pic: updateUser.picture });
            }else{
                res.status(404).json("User Not found");
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");    
    }
})


module.exports = route;