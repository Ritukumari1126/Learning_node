const mongoose = require('mongoose')
const { type } = require('os')

const contactSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullName:{type:String,require:true},
    age:{type:String,require:true},
    phone:{type:String,require:true},
    uId:{type:String,require:true}
})

module.exports = mongoose.model('contact',contactSchema)