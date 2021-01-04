const express = require('express')
const pool = require("../db/db")

const todoList = express.Router()


todoList.route('/')

//create
.post(async(req,res)=>{
    try{
        const {description,name} = req.body
        const newTodo = await pool.query("INSERT INTO item(name,description) VALUES($1,$2)",[name,description])
        res.status(200).send("success")
    }catch(err){
        console.error(err.message)
    }
})

//getall

.get(async(req,res)=>{
    const allTodo = (await pool.query("SELECT * from item ORDER BY id")).rows 
    res.json(allTodo)
})


todoList.route('/:id')

//update

.put(async(req,res)=>{
    try{
        const {name,description} = req.body
        const {id} = req.params
        const Todo = await pool.query("UPDATE item SET name=$1,description=$2 WHERE id=$3",[name,description,id])
    }catch(err){
        console.error(err.message)
    }
})

//delete

.delete(async(req,res)=>{
    try{
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM item WHERE id=$1",[id])
    }catch(err){
        console.error(err.message)
    }
})


//getone

.get(async(req,res)=>{
    const Todo = await pool.query("SELECT * from item WHERE id = $1",[req.params.id])
    res.json(Todo.rows[0])
})


module.exports = todoList
