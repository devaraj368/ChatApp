import { Component, OnInit } from '@angular/core';
import { SocketIOService } from 'src/app/service/socket/socket-io.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserdatasService } from 'src/app/service/userdatas.service';

@Component({
  selector: 'app-chathouse',
  templateUrl: './chathouse.component.html',
  styleUrls: ['./chathouse.component.css']
})
export class ChathouseComponent implements OnInit{

  room:any = localStorage.getItem('username');
  // username of friend
  roomconnect:any= this.activeRoute.snapshot.params['username']
  newMessage: string='';
  roomobj:any;
  chatUsers:any;

  messageList: string[] = [];
  getNewMessag: string[] = [];

  getUsername:any;

  storedMessages:any[] = [];
  storedMessages2:any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  

  constructor(
    private chatService:SocketIOService,
    private activeRoute:ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    private userService: UserdatasService
    ){}


  ngOnInit(){
    
    
    this.roomobj ={
      case1:this.roomconnect+this.room,
      case2:this.room+this.roomconnect
    }
    // console.log(this.roomobj);

    this.chatUsers = {
      sender: this.room,
      receiver: this.roomconnect
    }

    // username
    this.getUsername = this.activeRoute.snapshot.params['username']
    // console.log(this.getUsername);
    
    
    this.chatService.joinRoom(this.roomobj);
    
    

    this.chatService.getNewMessage().subscribe((message: string) => {

      this.messageList.push(message);

      if(this.room != this.roomconnect){
        this._snackBar.open(message ,'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        // alert(this.chatUsers)
      }

      
      // console.log('getNewMessage:  '+message);
      
    })

    
    this.chatService.getStoredMessages().subscribe((messages) => {
      this.storedMessages = messages;

      
    // console.log(JSON.stringify(this.storedMessages, null, 2));

    // this.chatService.getStoredMessages2().subscribe((message)=>{
    //   this.storedMessages2 = message
    // })
    });

    
  }
  

  sendMessage() {

    // console.log('clicked');
    
    
    if(this.room === this.roomconnect){
      this._snackBar.open('Sorry cant sent message for yourself' ,'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else{

      this.userService.blockStatus(this.chatUsers).subscribe((respo:any)=>{
        // console.log('block status: '+ respo);
        
        if(respo.status ==='1'){
          alert(respo.message)
        }
        else if (respo.status ==='2'){

          this.chatService.sendMessage(this.newMessage, this.roomobj,this.chatUsers);
          this.newMessage = '';
        }
      })



      
    }

    // this._snackBar.open('message' ,'close', {
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    

  }

  blockUser(){
    // console.log('clicked ');
    this.userService.blockStatus(this.chatUsers).subscribe((resp:any)=>{
      // console.log(resp);
      if(resp.status==='1'){
        alert('already blocked')
      }
      else{
        this.userService.blockuser(this.chatUsers).subscribe((res:any) =>{
          let data = res
          // console.log(res);
          alert('user blocked')
          })
      }

    })
    

  }
  unblockUser(){
    // console.log('clicked');
    
    this.userService.unblock(this.chatUsers).subscribe((respo:any)=>{
      // console.log(this.chatService);
      
      if(respo.status==='1'){
        alert(respo.message)
      }
      else if(respo.status ==='2'){
        alert(respo.message)
      }
    })
  }


}
