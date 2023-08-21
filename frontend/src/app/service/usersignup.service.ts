import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UsersignupService {

  
  // apiurl:String = 'api'
  apiurl:String = 'http://localhost:3005/api'

  constructor(private http:HttpClient) { }


  signupaccount(data:any){
    return this.http.post(`${this.apiurl}/signup`, data)

  }
}
