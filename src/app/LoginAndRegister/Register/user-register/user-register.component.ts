import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private loginService:LoginService ) { }

  ngOnInit(): void {
  }
  registerUserForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email:new FormControl("", Validators.required),
  })
  registerUser(){
      this.loginService.registerUser(this.registerUserForm.value).subscribe(()=>{
          alert("Đăng ký thành công !");
      })
  }
}
