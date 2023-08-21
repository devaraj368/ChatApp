const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://devarajp368:devaraj1@cluster0.fl8wohu.mongodb.net/chatappdb")
.then(()=>{
    console.log('__________MONGODB CONNECTED__________');
})
.catch(err=>console.log(err.message))