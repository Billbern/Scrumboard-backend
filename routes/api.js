let express = require('express');
const cors = require('cors');
let route = express.Router();

// use cross origin requests and json
route.use(cors());
route.use(express.json());

// get document model for accessing data
const Task = require('../models/task');

// handle read requests for all tasks
route.get('/tasks', async (req, res)=>{
    try {
        let tasks = await Task.find();
        res.status(200).send({data: tasks})
    } catch (err) {
        console.error(err);
        res.status(500).send({data: "Error"})
    }
})

// handle a create request for a single task
route.post('/task', async (req, res)=>{
    try {
        let newTask = new Task(req.body);
        await newTask.save();
        res.status(200).send({data: newTask});
    } catch (err) {
        console.error(err);   
        res.status(500).send({data: "Error"})
    }
})

// handle an edit request for a task
route.put('/task/:id', async (req, res)=>{
    try {
        let updatedTask =  await Task.findOneAndUpdate({id: req.params.id},  req.body);
        if(updatedTask){
            res.status(200).send({data: updatedTask});
        }else{
            res.status(404).send({data: "Not found"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({data: "Error"});    
    }
})

// handle a delete request for a single task
route.delete('/task/:id', async (req, res)=>{
    try {
        let deletedTask =  await Task.findOneAndDelete({id: req.params.id});
        if(deletedTask){
            res.status(200).send({data: deletedTask});
        }else{
            res.status(404).send({data: "Not found"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({data: "Error"});    
    }
})


module.exports = route;