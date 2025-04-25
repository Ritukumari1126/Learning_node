const express = require('express')
const Router = express.Router();
const Contact = require('../model/Contact')
const mongoose = require('mongoose');

const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')

Router.post('/add-contact',checkAuth,(req,res)=>{
    const verifiedUser = jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
    const newContact = new Contact({
        _id:new mongoose.Types.ObjectId,
        fullName:req.body.fullName,
        age:req.body.age,
        phone:req.body.phone,
        uId:verifiedUser._id
        //address:req.body.address
    })

    newContact.save()
    .then(result=>{
        res.status(200).json({
            Contact:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

Router.get('/all-contact',checkAuth,(req,res)=>{
    const verifiedUser = jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
    console.log(verifiedUser)
    Contact.find({uId:verifiedUser._id})
    .select("_id fullName age phone")
    .then(result=>{
        res.status(200).json({
            contactList:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


// get contact detail by id

Router.get('/contact-detail/:id',checkAuth,(req,res)=>{
    const verifiedUser = jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
    console.log(req.params.id)
    Contact.find({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            contact:result
        })
    })   
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete by  id

Router.delete('/delete/:id',checkAuth,(req,res)=>{
    const verifiedUser = jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
    Contact.findByIdAndDelete({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            contact:result
        })
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//update by id

Router.put('/put/:id',checkAuth,(req,res)=>{
    const verifiedUser = jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
    Contact.findByIdAndUpdate({_id:req.params.id},{
        fullName:req.body.fullName,
        age:req.body.age,
        phone:req.body.phone
    },{new:true})
    .then(result=>{
        res.status(200).json({
            updatecontact:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})


module.exports = Router; 