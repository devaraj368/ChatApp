import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})


export class SocketIOService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:3005');
  

  // sent message
  public sendMessage(message: string, room:String, users:string) {
    this.socket.emit('message', {message,room,users});
  }
  joinRoom(room: string): void {
    this.socket.emit('join', { room });
  }
  
  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

  

  getStoredMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('storedMessages', (messages) => {
        observer.next(messages);
      });
    });
  }
  // getStoredMessages2(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.socket.on('storedMessagesRoom2', (messages) => {
  //       observer.next(messages);
  //     });
  //   });
  // }

// new code
  // private url = 'http://localhost:3005'

  // constructor(private socket:Socket){

  //   this.socket = io(this.url)

  // }

  // joinRoom(data:any){
  //   this.socket.emit('join', data);

  // }
  // sendMessage(data: any){
  //   this.socket.emit('message' , data);
  // }

  // getMessage(): Observable<any>{
  //    return new Observable<{user:String, message:String}>(observer=>{
  //     this.socket.on('new mesage', (data)=>{
  //       observer.next(data)
  //     });
  //     return ()=>{
  //       this.socket.disconnect();
  //     }
  //    })
  // }
}

