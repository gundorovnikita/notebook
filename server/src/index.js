const express = require("express")
const app = express()
const cors = require("cors")


//routes
const auth = require('./routes/auth')
const todoList = require('./routes/todoList')


//middleware
app.use(cors())
app.use(express.json())

app.get('/favicon.ico',(req,res)=>{
    return res.status(204)
})

app.use(auth)
app.use(todoList)


app.listen(5000,()=>{
    console.log("server has been started on port 5000")
})
