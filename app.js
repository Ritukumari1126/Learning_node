const express = require('express')
const app = express()
const contactRouter = require('./routes/contact')
const userRouter = require('./routes/user')
//const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://Ritu1106:Ritu1106@cluster0.zmd7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log(err)
})

app.use(bodyParser.json())

app.use('/contact',contactRouter);
app.use('/user',userRouter)
module.exports = app;