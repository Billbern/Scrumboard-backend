const express = require('express'),
        jwt = require('jsonwebtoken'),
        route = express.Router();

// use json
route.use(express.json());

// get document model for accessing data
const Task = require('../models/task');
const Logs = require('../models/log');
const verifyToken = require('../utils/verifytoken');


// handle read requests for all tasks
route.get('/tasks', verifyToken, async (req, res) => {
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            let tasks = await Task.find({ owner: verifyUser.id }).populate('owner', 'username');
            if (tasks.length > 0 ) {
                res.status(200).json(tasks);
            }else{
                res.status(200).json([]);
            }
        } else {
            res.status(401).json("User not authorized")
        }
    } catch (err) {
        res.status(500).json("Error")
    }
})


route.get('/logs', verifyToken, async (req, res) => {
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            const logs = await Logs.find({ owner: verifyUser.id }).sort({ 'createAt': -1 }).populate('task', 'id');
            if (logs.length > 0) {
                res.status(200).json(logs);
            } else {
                res.status(200).json([]);
            }
        } else {
            res.status(401).json("User Not authorised")
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error")
    }
})

module.exports = route;