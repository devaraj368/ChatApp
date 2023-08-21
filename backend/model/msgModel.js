const mongoose = require('mongoose')
const Schema = mongoose.Schema

const msgSchema = new Schema({
    sender:{
        type:String,
        require:true
    },
    receiver:{
        type:String,
        require:true
    },
    message:{
        type:String,
        required:true
    },
    case1:{
        type:String,
        required:true   
    },
    case2:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

var MessageModel = mongoose.model("ChatMessage", msgSchema)

module.exports = MessageModel