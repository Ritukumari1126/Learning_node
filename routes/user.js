const express = require('express')
const Router = express.Router()
const User = require('../model/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// user signup

Router.post('/signUp',(req,res)=>{
    User.find({email:req.body.email})
    .then(result=>{
        if(result.length > 0){
            return res.status(500).json({
                errror:'email is already registered '
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
       // console.log(hash)
       const newUser = new User({
        _id:new mongoose.Types.ObjectId,
        fullName:req.body.fullName,
        email:req.body.email,
        password:hash
    })
    newUser.save()
    .then(result=>{
        res.status(200).json({
            newUser:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    })
   
        
})

Router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .then(use=>{
        if(use.length == 0){
            return res.status(500).json({
                error : 'email is not registered...'
            })
        }
        bcrypt.compare(req.body.password,use[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(500).json({
                    error:'invalid password'
                })
            }

            const token = jwt.sign({
                _id:use[0]._id,
                fullName:use[0].fullName,
                email:use[0].email
            },
            'sbs online classes 123',
            {
                expiresIn:'365d'
            }
        )

        res.status(200).json({
            user:{
                _id:use[0].id,
                fullName:use[0].fullName,
                email:use[0].email,
                token:token
            }
        })
        })
    })
   .catch(err=>{
    res.status(500).json({
        error:err
    })
   })
})

module.exports = Router