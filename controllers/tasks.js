const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require("../errors/custome-error")

const getAllTasks = asyncWrapper(async(req, res) =>{
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
})

const  createTask  =  asyncWrapper (async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task }) 
})

const getTask = asyncWrapper(async(req, res, next) => {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID})
        if(!task) {
            return next(createCustomError(`No task with ID : ${taskID}`, 404))
        }
        res.json(200).json({ task })
})


const deleteTask = asyncWrapper (async( req, res) => {
        const { id: taskID} = req.params
        const task = await Task.findByIdAndDelete({ _id: taskID})
        if (!task) {
            return next(createCustomError(`No task with ID : ${taskID}`, 404))

        }
        res.status(200).json({ task })
})

const updateTask = async(req, res) => {
    try {
        const {id: taskID } = req.params;
        const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        })

        if (!task) {
            return next(createCustomError(`No task with ID : ${taskID}`, 404))
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = {
    getAllTasks, 
    createTask, 
    getTask,
    updateTask, 
    deleteTask
}