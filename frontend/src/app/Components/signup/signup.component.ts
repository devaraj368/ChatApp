import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { UsersignupService } from 'src/app/service/usersignup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  passwordPattern:any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
 

  signup= new FormGroup({
    name:new FormControl('',[ Validators.required,Validators.pattern('^(?!\\s*$)[A-Za-z\\s]+$')]),
    email:new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(10),Validators.pattern('^[a-z0-9]+$')]),
    password: new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)]),
    repassword: new FormControl('',[Validators.required])
  })

  repassverify:any =this.signup.controls.password.value
  
  constructor(private router:Router, private api:UsersignupService){}
  ngOnInit(): void {

  }
  get form2():any{
    return this.signup.controls;
  }

  signupstatus:any


  signupaccount(){

    if( this.signup.controls.repassword.value== this.signup.controls.password.value){

      this.api.signupaccount(this.signup.value).subscribe(res=>{
        this.signupstatus= res
  
        if(this.signupstatus.status=='1'){
          alert('Signup Successfull')
        this.router.navigateByUrl('/')
        }
        else if(this.signupstatus.status=='2'){
          alert('data alredy exist')
        }
        else if(this.signupstatus.status=='3'){
          alert('username alredy exist')
        }
  
      })

    }
    else{
      alert('password does not match')


    }


    
  }
  
}
