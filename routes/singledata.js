const express = require('express'),
        jwt = require('jsonwebtoken'),
        route = express.Router();

// use json
route.use(express.json());

// get document model for accessing data
const Task = require('../models/task');
const Feed = require('../models/log');
const verifyToken = require('../utils/verifytoken');


// handle a create request for a single task
route.post('/task', verifyToken, async (req, res) => {
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            const newData = { ...req.body, owner: verifyUser.id };
            let newTask = await Task.create(newData);
            if (newTask) {
                await Feed.create({ message: "Added a new task to Todo", task: newTask._id, owner: verifyUser.id });
                res.status(200).json('new task added successfully');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
})

// handle read requests for a single task
route.get('/task/:id', verifyToken, async (req, res) => {
    try {
        let tasks = await Task.findOne({ id: req.params.id });
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
})



// handle an edit request for a task
route.put('/task/:id', verifyToken, async (req, res) => {
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            let updatedTask = await Task.findOneAndUpdate({ id: req.params.id }, req.body);
            if (updatedTask) {
                await Feed.create({ message: `Moved a task to ${req.body.stage}`, task: updatedTask._id, owner: verifyUser.id });
                res.status(200).json("task updated successfully");
            } else {
                res.status(404).json("Task not found");
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
})

// handle a delete request for a single task
route.delete('/task/:id', verifyToken, async (req, res) => {
    try {
        const verifyUser = await jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (verifyUser) {
            let deletedTask = await Task.findOneAndDelete({ id: req.params.id });
            if (deletedTask) {
                await Feed.create({ message: `Deleted a task `, task: deletedTask._id, owner: verifyUser.id });
                res.status(200).json('deleted tasks successfully');
            } else {
                res.status(404).json("Task not found");
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
})


module.exports = route;