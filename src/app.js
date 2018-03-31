import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import connect from "./DB/connect"
import ToDoModel from './DB/ToDoModel'
import EventModel from "./DB/EventModel"
import NodeMailer from "nodemailer"
import cors from 'cors'
import "babel-polyfill";
const app = express();

app.use(cors())
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

        const userTasks = await ToDoModel.find({userId: req.body.userId})

        if(!userTasks.length) throw new Error('Task with this user ID doesn\'t exist')

        res.status(200).json({
            success: true,
            data: userTasks,
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
            if(userTasks.tasks[i].task == req.body.ccc) userTasks.tasks[i].finished = true
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

app.post('/updateTaskChild', async (req, res) => {
    try {
        const TODO = await ToDoModel.findOne({name: req.body.tasksName})
        const LEN = TODO.tasks.length
        TODO.tasks[LEN] = {"task": req.body.newTask, finished: false}
        TODO.markModified('tasks')
        const USERTASKS = await TODO.save()
        res.status(200).json({
            success: true,
            data: USERTASKS
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            error: String(err)
        })
    }
})

app.delete('/deleteTaskChild', async (req, res) => {
    try{
        const TODO = await ToDoModel.findOne({userId: req.body.userId, name: req.body.tasksName})

        if(!TODO) throw new Error('There is nothing to delete by this user or tasksname')

        let deleted = false

        TODO.tasks.map(data => {
            if(data.task === req.body.task) {
                deleted = true
                TODO.tasks.splice(TODO.tasks.indexOf(data), 1)
            }
        })

        if(!deleted) throw new Error('There is nothing to delete')

        TODO.markModified('tasks')

        const USERTASKS = await TODO.save()

        res.status(200).json({
            success: true,
            data: USERTASKS
        })

    } catch(err) {
        res.status(400).json({
            success: false,
            error: String(err)
        })
    }
})

app.delete('/deleteTask', async (req, res) => {
    try{
        const REMOVE = await ToDoModel.findOneAndRemove({userId: req.body.userId, name: req.body.tasksName})

        if(!REMOVE) throw new Error('Nothing to remove')

        res.status(200).json({
            success: true,
            data: 'Removal was successful'
        })

    } catch(err) {
        res.status(400).json({
            success: false,
            error: String(err)
        })
    }
})

app.post('/addEvent', async (req, res) => {
    let events = req.body.event
    let userId = req.body.userId
    let categoryId = req.body.categoryId
    let event = {event: events, category: categoryId}
    try{
        if(!events || !userId || !categoryId) throw new TypeError('Some of body is missing')
        let test = await EventModel.findOne({userId, categoryId})
        if(test) res.status(200).json({
            success:false,
            error: "Already submitted"
        })
        let Add = await EventModel.create({event, userId})
        res.status(200).json({
            success:true,
            data: Add
        })
    }catch(err) {
        res.status(400).json({
            success: false,
            error: err
        })
    }
})

app.post('/getEvents', async(req, res) => {
    try{
        if(!req.body.userId) throw new TypeError("UserID missing")

        let Get = await EventModel.find({userId: req.body.userId})

        if(!Get.length) throw new Error("No events found")

        res.status(200).json({
            success: true,
            data: Get
        })

    }catch(err) {
        res.status(400).json({
            success: false,
            error: err
        })
    }
})

app.post('/form', async (req, res) => {
    try{
        const BODY = req.body

        if(!BODY) throw new Error("Nothing to send")

        const confEmail = process.env.email
        const password = process.env.emailPassword

        let htmlString = ''

        for(let key in BODY) {
            htmlString += `<p>${key} : ${BODY[key]} </p>`
        }

        const transporter = NodeMailer.createTransport({
            service: "Gmail",
            secure: false,
            port: 25,
            auth: {
                user: confEmail,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const HelperOptions = {
            from:`"Karolis - Blogger" <`,
            to: 'karolis.malisauskas@gmail.com',
            subject: 'Nauja uzklausa',
            text: "Jus gavote nauja užklausa!",
            html: `Jūs gavot nauja užklausą 
            ${htmlString}`
        }
        await transporter.sendMail(HelperOptions)
        res.status(200).json({
            success: true,
            data: 'Email sent successfully'
        })
    } catch(error) {
        res.status(400).json({error: String(error)})
    }
})

export default app