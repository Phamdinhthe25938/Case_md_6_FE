import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  appUser: any;
  enterprise: any;
  checkUsername: boolean | undefined;
  checkEmail: boolean | undefined;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.appUser=this.loginService.findAllUser();
    this.enterprise=this.loginService.findAllEnterprise();
  }
  registerUserForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email:new FormControl("", Validators.required),
  })
  checkuser(){
    this.checkUsername=true;
    let usernameuser= this.registerUserForm.value.username
    for (let i = 0; i < this.appUser.length; i++) {
      if (usernameuser==this.appUser[i].username){
        this.checkUsername=false;
        break;
      }
    }
    console.log(this.checkUsername)
    for (let i = 0; i < this.enterprise.length; i++) {
      if (usernameuser==this.enterprise[i].nameEnterprise){
        this.checkUsername=false;
        break;
      }
    }
    console.log("checkuser")
    console.log("checkuser")
    console.log("checkuser")
    console.log("checkuser")
    console.log(this.checkUsername)
  }


  checkEmailU(){
    this.checkEmail=true;
    let emailuser=this.registerUserForm.value.email
    for (let i = 0; i < this.appUser.length; i++) {
      if (emailuser==this.appUser[i].email){
        this.checkEmail=false
        break;
      }
    }
    for (let i = 0; i < this.enterprise.length; i++) {
      if (emailuser==this.enterprise[i].gmailEnterprise){
        this.checkEmail=false
        break;
      }
    }
    console.log(this.checkEmail)
  }

  registerUser(){
    if (this.checkUsername&&this.checkEmail){
      this.loginService.registerUser(this.registerUserForm.value).subscribe(()=>{
          alert("Đăng ký thành công !");
        this.router.navigate([""])
      })
  }}
}
