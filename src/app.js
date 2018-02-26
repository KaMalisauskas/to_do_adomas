import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import connect from "./DB/connect"
import ToDoModel from './DB/ToDoModel'
const app = express();


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to to-do API"
    })
})

app.post('/addTask', async (req, res) => {
    let userId = req.body.userId
    let name = req.body.name
    let tasks = req.body.task
    let array = []

    for(let task of tasks) {
        array.push({task: task, finished: false})
    }
    tasks = array
    try {
        let userToDo = await ToDoModel.create({userId, name, tasks})
        res.status(200).json({
            success: true,
            data: userToDo.toJson()
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err
        })
    }
})

app.post('/getTask', async (req, res) => {
    try{
        const userTasks = await ToDoModel.findOne({userId: req.body.userId})
        if(!userTasks) res.status(404).json({
            success: false,
            error: "Task with this user ID doesn't exist"
        })
        console.log(userTasks.tasks)
        let len = userTasks.tasks.length
        let temp = 0
        let part = 100 / len
        userTasks.tasks.map(task => (task.finished) ? temp++ : "")
        res.status(200).json({
            success: true,
            data: userTasks,
            finished: temp * part
        })
    }catch(err) {
        res.status(400).json({
            success: false,
            error: err
        })
    }
})

app.post("/updateTask", async (req, res) => {
    try{
        const userTasks = await ToDoModel.findOne({userId: req.body.userId})
        if(!userTasks) res.status(404).json({
            success: false,
            error: "Task with this user ID doesn't exist"
        })
        for(let i = 0; i < userTasks.tasks.length;i++) {
            if(userTasks.tasks[i].task == req.body.taskName) userTasks.tasks[i].finished = true
        }
        userTasks.markModified('tasks')
        const userTask = await userTasks.save()
        res.status(200).json({
            success: true,
            data: userTask
        })
    }catch (err) {
        res.status(400).json({
            success: false,
            error: err
        })
    }
})

export default app