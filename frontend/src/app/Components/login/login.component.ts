import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { UserloginService } from 'src/app/service/userlogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login= new FormGroup({
    email:new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])

  })
  
  constructor(private router:Router, private api:UserloginService){}
  ngOnInit(): void {

  }

  get form2():any{
    return this.login.controls;
  }
loginstatus:any


loginform(){
    

  this.api.loginaccount(this.login.value).subscribe(res=>{

    this.loginstatus = res
    console.log(res);
    
    if(this.loginstatus.status=='1'){
      alert('Login Success')
      localStorage.setItem('token', this.loginstatus.token)
      localStorage.setItem('username', this.loginstatus.username.username)
      this.router.navigateByUrl('chat')

    }
    else if(this.loginstatus.status=='2'){
      alert('password not matches')
    }
    else if(this.loginstatus.status=='3'){
      alert('Email is not currect')
    }
    else{
      alert('Password is not currect')
    }
  })


}
}