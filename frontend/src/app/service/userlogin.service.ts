import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  // apiurl:String = 'api'
  apiurl:String = 'http://localhost:3005/api'

  constructor(private http:HttpClient) { }

  loginaccount(data:any){
    return this.http.post(`${this.apiurl}/login`,data)

  }
  getToken(){
    return localStorage.getItem('token')
  }
}
