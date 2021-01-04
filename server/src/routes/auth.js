require('dotenv').config()
const express = require('express')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {v4:uuid} = require("uuid")

const auth = express.Router()


//jwtauth
//
//-----

const users=[]
const refreshTokens=[]


async function generateTokens(userId){
    const access_token = await jwt.sign(userId,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5m'})
    const refresh_token = await uuid()
    refreshTokens.push({token:refresh_token,userId})
    return{access_token,refresh_token}  
}


auth.post('/login',async(req,res)=>{   
    try{
        const {username,password}=req.body
        if(!username || !password || username.length<6 || password.length<6){
            return res.status(409).send('incorrect username or password')
        } 
        const user = users.find(user=>user.username==username)
        if(user){
            if(await bcrypt.compare(password,user.password)){
                return res.json(generateTokens(user.id))
            }
        }else{
            return res.status(409).send("wrong")
        }
    }catch(err){
        console.error("errornick= ",err)
    }
})

auth.post('/register',async(req,res)=>{
    try{
        const {username,password} = req.body
        if(!username || !password || username.length<6 || password.length<6){
            return res.status(409).send('incorrect username or password')
        }
        if(username && password){
            const hashPassword = await bcrypt.hash(password,10)
            users.push({
                id:users.length,
                username:username,
                password:hashPassword,
            })
            return res.json({username})
        }else{
            return res.status(409).send('please fill in all the required fields')
        }
    }catch(err){
        console.error("errornick= ",err)
        return res.status(409)
    }
})

auth.post('/logout',async(req,res)=>{
    try{

    }catch(err){
        console.error("errornick= ",err)
        return res.status(409)
    }
})

auth.post('/refresh',async(req,res)=>{
    try{
        const {refreshToken} = req.body
        const dbToken = refreshTokens.find(token=>token.token==refreshToken)
        if(!dbToken)return res.status(409).send('no token')
        refreshTokens=refreshTokens.filter(token=>token!=dbToken)
        return(generateTokens(dbToken.userId))

    }catch(err){
        console.error("errornick= ",err)
        return res.status(409)
    }
})


auth.get('/jwtcheck',authCheck,(req,res)=>{
    res.send(req.user)
    res.send("hello")
})



function authCheck(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if (err) return res.status(403)
            req.user = user
            next()
        })
    }else{
        return res.status(406).send("error auth")
    }
} 


module.exports = auth
