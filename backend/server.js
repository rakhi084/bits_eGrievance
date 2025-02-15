//Like Importing from .env
require('dotenv').config()
const cors = require('cors');
//Like importing Express
const express = require('express')

//import Mongoose
const Mongoose = require('mongoose')

//importing workouts
const grievanceRoutes = require('./routes/grievances')
const userRoutes = require('./routes/user')

//express app
const app = express()
app.use(cors());


//middleware
//The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/grievances', grievanceRoutes)
app.use('/api/user', userRoutes)

//Connect to DB
Mongoose.connect("mongodb://localhost/grievancetest",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, ()=>{
            console.log("Connected to DB & Listening to port")
        })
    })
    .catch((error) => {
        console.log(error)
    })

//listen for Request
// app.listen(process.env.PORT, ()=>{
//     console.log("Listening to port")
// })