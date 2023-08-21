const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const UserDBSchema = new Schema ({
    name : {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    repassword:{
        type:String,
        require:true
    },
    friends: [{
        username: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },

      }],
    blockedUsers:{
      type : Array
    },
    mutedUsers:{
      type : Array
  }
})

UserDBSchema.pre('save',async  function (next){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    this.repassword = await bcrypt.hash(this.repassword, salt)
    next();
})


var signupModel = mongoose.model("UserSignupDATA", UserDBSchema)

module.exports = signupModel