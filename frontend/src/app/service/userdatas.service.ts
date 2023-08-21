import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdatasService {

 // apiurl:String = 'api'
 apiurl:String = 'http://localhost:3005/api'

 constructor(private http:HttpClient) { }


getUsers(){
  return this.http.get(`${this.apiurl}/allusers`)
}

blockuser(data:any){
  return this.http.put(`${this.apiurl}/block`, data)
}

blockStatus(data:any){
  return this.http.post(`${this.apiurl}/testblocklist`, data)
}

unblock(data:any){
  return this.http.post(`${this.apiurl}/unblock`, data)
}

}
