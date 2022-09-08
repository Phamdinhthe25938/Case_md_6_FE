import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChangePassWord} from "../../model/ChangePassWord";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-pas',
  templateUrl: './forgot-pas.component.html',
  styleUrls: ['./forgot-pas.component.css']
})
export class ForgotPasComponent implements OnInit {
checkpass!:boolean;
  setPassWord!:ChangePassWord;
  constructor( private loginService:LoginService, private router: Router) {

  }

  ngOnInit(): void {
    this.checkpass=true;
  }
  changePasswordForm = new FormGroup({
    email: new FormControl(""),
    passwordNew: new FormControl(""),
    enterPassword: new FormControl(""),
  })
  changePassword(){
    let formchange=this.changePasswordForm.value
    console.log("okok")
    console.log("okok")
    console.log(formchange)
     if (this.checkpass){
       let pass={
          gmail:formchange.email,
         password:formchange.passwordNew,
       }
       this.loginService.changePassword(pass).subscribe((data) => {
         alert("Đổi mật khẩu thành công")
         this.router.navigate([""]);
       });
}
}
  checkpassword(){
    this.checkpass=true;
    let formchange=this.changePasswordForm.value
    if (formchange.passwordNew!=formchange.enterPassword){
      this.checkpass=false
    }
  }
}
