const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullName:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
},{timestamps:true})

module.exports = mongoose.model('user',userSchema);