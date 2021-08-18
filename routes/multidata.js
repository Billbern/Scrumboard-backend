const express = require('express');
const jwt = require('jsonwebtoken');
let route = express.Router();

// use json
route.use(express.json());

// get document model for accessing data
const Task = require('../models/task');
const verifyToken = require('../utils/verifytoken');

// handle read requests for all tasks
route.get('/tasks', verifyToken, async (req, res) => {
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            let tasks = await Task.find({ owner: verifyUser.id }).populate('owner', 'username');
            res.status(200).json(tasks);
        } else {
            res.clearCookie('ahyensew');
            res.status(403).json("User not authorized")
        }
    } catch (err) {
    console.error(err);
    res.status(500).json("Error")
}
})


module.exports = route;