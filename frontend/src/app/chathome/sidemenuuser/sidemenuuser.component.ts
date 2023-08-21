import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdatasService } from 'src/app/service/userdatas.service';

@Component({
  selector: 'app-sidemenuuser',
  templateUrl: './sidemenuuser.component.html',
  styleUrls: ['./sidemenuuser.component.css']
})

export class SidemenuuserComponent {

  username:any = ''

  constructor(
    private api:UserdatasService,
    private router:Router
    ){}
  ngOnInit(){
    this.api.getUsers().subscribe((res)=>{
      this.username = res
      // console.log(res);
     })
  }

  reload():void{
    location.reload();
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.router.navigateByUrl('/')
  }

  
  
}
