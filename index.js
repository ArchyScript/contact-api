const express = require('express')
const app = express()
require('dotenv/config')
const errorHandler = require('./middleware/errorHandler')
// const bodyParser = require('body-parser')  


const { connectDatabase } = require('./config/mongooseConnect')

// middleware 
app.use(express.json()); // To parse JSON bodies
app.use(errorHandler);
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// API port
const PORT = process.env.PORT

// connect to database
connectDatabase()

// routes
const authRoute = require('./routes/auth')
const contactsRoute = require('./routes/contacts');

// referencing routes
app.use('/api/user', authRoute)
app.use('/api/contacts', contactsRoute)

// listen to port
app.listen(PORT, () => {
    console.log(`server litening on port: ${PORT}`)
})