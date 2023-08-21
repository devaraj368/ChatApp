const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

const bcrypt = require('bcrypt')

app.use(cors());

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});




// PORT = 3005
const PORT = 3005

// DB require
require('./config/database')

// signupmodel
const signupModel = require('./model/signupmodel');

// signup api
app.post('/api/signup',async (req,res)=>{
    
    let signupdata = req.body
    let signupemail = req.body.email
    let signupusername = req.body.username

    try {
        
        let usernamesearch = await signupModel.find({username:signupusername})
        
        let datasearch = await signupModel.find({email:signupemail})
        // console.log("DEARCHED DATA: "+datasearch);

        if(datasearch=='' && !signupemail == '' ){
            console.log("BODY DATA : "+signupdata);

            if(usernamesearch==''){
                let signupdatasave = new signupModel(signupdata)
                await signupdatasave.save()
                res.json({status:'1'})
                console.log('one singup data added to DB');
                console.log("SUCCESS DATA: "+signupdatasave);
            }
            else{
                res.json({status:'3'})
                console.log('username alredy exist');
            }


        }

        else{
            res.json({status:'2'})
            console.log("data alredy exist");
            // console.log("ERROR data: "+datasearch);

        }

        
    } catch (error) {
        console.log(error.message);
        
    }
})


var jwt = require('jsonwebtoken');
const CODE = "this is a chat application"

// login api
app.post('/api/login', async (req,res)=>{

    try {
        let emailid = req.body.email
        let passworddb = req.body.password
        console.log(req.body);
        let data = await signupModel.findOne({email:emailid})

        if( data!==null ){ 
            // console.log('email recognised');
            console.log(data);
            const isPasswordMatch = await bcrypt.compare(passworddb, data.password);
            console.log(isPasswordMatch);

            if (isPasswordMatch){
                console.log("login successful")
                let payload = {
                    'email':emailid,
                    'password':passworddb
                }
                let token = jwt.sign(payload,CODE)
                
                res.json({status:'1', token:token, username:data})
                console.log('TOCKEN: ' + token);

            }
            else{
                res.json({status:'password not matches'})
                console.log('2');
            }
        
        }
        else{
            res.json({status:'3'})
            // console.log('Please check email or signup');
        }


    } catch (error) {
        console.log(error);
    }
})

// get user by username
app.get('/api/users/:username', async (req,res)=>{

    try {
        let uname = req.params.username
        let data =await signupModel.findOne({username:uname})

        if(data){
            res.status(200).json(data)
        }
        else{
            res.json({status:'1', message:'No username found'})
        }
        
        
    } catch (error) {
        console.log(error.message);
    }
})

// get all users
app.get('/api/allusers', async (req,res)=>{

    try {
        let data =await signupModel.find()

        if(data){
            res.status(200).json(data)
        }
        else{
            res.json({status:'1', message:'No username found'})
        }
        
        
    } catch (error) {
        console.log(error.message);
    }
})


// blocking
app.put('/api/block', async(req, res)=>{
    try {
        console.log("from frontend ", req.body);
        let name = req.body.sender 
        let mutedUser = req.body.receiver
        console.log(mutedUser);
        muted = await signupModel.findOneAndUpdate({username : name},{$push: {blockedUsers : mutedUser}})
        console.log('data: '+muted);
        res.json({"status":"success", data:muted, message:'user blocked'})

    } catch (error) {
        console.log(error.message); 
        res.json({"status":"failed" , data:muted}) 
    }
})

// unblock
app.post('/api/unblock',async (req,res)=>{
    try {
    console.log('unblock:  : '+req.body);
      let profileuser = req.body.sender;
      let blockuser = req.body.receiver
      senderblocked = await signupModel.updateOne({username:profileuser},{$pull:{blockedUsers:blockuser}});
      console.log('data: '+senderblocked);
        
      if(senderblocked.acknowledged == true   ){

          res.json({status:"1", message:'User unblocked'})
  
      }else{
          res.json({status:'2', message:'user not blocked'})
      }
    } catch (error) {
      console.log(error);
    }
  })

  app.post('/api/testblocklist', async (req,res) =>{
    try {
        let senders = req.body.sender
        let receivers = req.body.receiver
        console.log(receivers);
        let data = await signupModel.findOne({username:senders,blockedUsers:receivers})
        console.log(data);

        if(data){
        res.json({status:'1' ,message:'user already blocked'})
        console.log('user already blocked ');

        }
        else{
        console.log('user not blocked');
        res.json({status:'2',message:'user not blocked'})
        }

    } catch (error) {
        res.json({"status":error.message})
        
    }
  })

const modelMessage = require('./model/msgModel');

io.on('connection', (socket) => {
    
    socket.on('join', (data)=>{
    console.log(data.room.case1);
    socket.join(data.room.case1 || data.room.case2);
    modelMessage.find({ $or: [{ case1: data.room.case1 }, { case1: data.room.case2 }] })
        .then((messages) => {
            socket.emit('storedMessages', messages);
            // console.log('stored messages: ' + messages);
            console.log('room1: ' + data.room.case1 + ' room1: ' + data.room.case2);


            socket.on('message', (data) => {
                //   console.log(data.room);
                
                //   console.log('MESSAGES: '+data.message +' :  case 1 : '+ data.room.case1 + ' case 2 : ' + data.room.case2);
                
                
                    console.log('else worked');
                    // res.json({status:'2',message:'user not blocked'})
                    const newMessage = new modelMessage ({
                        sender: data.users.sender,
                        receiver: data.users.receiver,
                        message: data.message,
                        case1: data.room.case1,
                        case2:data.room.case2 
                    })
                    console.log(newMessage);
                    newMessage.save()
                    .then(() => {
                        console.log('Message saved to MongoDB');

                        
                        io.in(data.room.case1).except(data.room.case2).emit('message', `${data.message}`);
                        io.in(data.room.case2).except(data.room.case1).emit('message', `${data.message}`);

                            
                    })
                    .catch((error) => {
                        console.error('Error saving message: ', error.message);
                    });
               
                
                //   console.log(data.users.receiver);
                    


                    
            });
            // new user message
            // io.in(data.room.case1 || data.room.case2).emit('message', `new user joins ${data.room.case1 || data.room.case2}`)
            
            
        })
        .catch((error) => {
            console.error('Error fetching stored messages: ', error.message);
        });
    })

    
    

    
  
    // socket.on('disconnect', () => {
    //   console.log('a user disconnected!');
    //   io.emit('message', 'user disconnected')
    // });

    

});








// app.listen(PORT,()=>{
//     console.log(`_________SERVER STARTED ${PORT}_________`);
// })

// server.listen(PORT, ()=>{
//     console.log(`server is running on port: ${PORT}`);
// })

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));