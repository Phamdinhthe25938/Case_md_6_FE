import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Enterprise} from "../../../model/Enterprise";
import {Field} from "../../../model/Field";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";


import {Router} from "@angular/router";
import {AppUser} from "../../../model/AppUser";


@Component({
  selector: 'app-enterprise-register',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.css']
})
export class EnterpriseRegisterComponent implements OnInit {
  enterpriseDeltal!: Enterprise;
  fb:any;
  downloadURL: Observable<string> | undefined;
  fields!: Field[];
  appUser: any;
  enterprise: any;
  checkUsername: boolean | undefined;
  checkEmail: boolean | undefined;
  constructor(private loginService: LoginService,private storage: AngularFireStorage,private router :Router) {
  }
  ngOnInit(): void {
    this.loginService.findAllField().subscribe((data) => {
      this.fields = data;
    })
    this.appUser=this.loginService.findAllUser();
    this.enterprise=this.loginService.findAllEnterprise();

  }

  registerForm = new FormGroup({
    nameEnterprise: new FormControl("", Validators.required),
    codeConfirmEnterprise: new FormControl("", Validators.required),
    gmailEnterprise: new FormControl("", Validators.required),
    imgEnterprise: new FormControl(localStorage.getItem("urlImange"), Validators.required),
    addressMainEnterprise: new FormControl("", Validators.required),
    idField: new FormControl(),
    describeEnterprise: new FormControl("", Validators.required),
  })


checkuser(){
  this.checkUsername=true;
   let username= this.registerForm.value.nameEnterprise
  for (let i = 0; i < this.appUser.length; i++) {
    if (username==this.appUser[i].username){
      this.checkUsername=false;
    }
  }
  for (let i = 0; i < this.enterprise.length; i++) {
    if (username==this.enterprise[i].nameEnterprise){
      this.checkUsername=false;
    }
  }
  console.log(this.checkUsername)
}


checkEmailE(){
  this.checkEmail=true;
  let email=this.registerForm.value.gmailEnterprise
  for (let i = 0; i < this.appUser.length; i++) {
    if (email==this.appUser[i].email){
      this.checkEmail=false
      break;
    }
  }
  for (let i = 0; i < this.enterprise.length; i++) {
    if (email==this.enterprise[i].gmailEnterprise){
      this.checkEmail=false
      break;
    }
  }
  console.log(this.checkEmail)
}


  register() {
    let urlImage= localStorage.getItem("urlImange")
    console.log(this.registerForm)
    // console.log("URL Image")
    // console.log(urlImage)
    let filed = this.registerForm.value;
    let filedNew = {
      nameEnterprise: filed.nameEnterprise,
      codeConfirmEnterprise: filed.codeConfirmEnterprise,
      gmailEnterprise: filed.gmailEnterprise,
      imgEnterprise: filed.imgEnterprise,
      addressMainEnterprise: filed.addressMainEnterprise,
      describeEnterprise: filed.describeEnterprise,
      fieldEnterprise: {
        idField: filed.idField
      }
    }
    // console.log("doanh nghieppppppp")
    // console.log(filed)
    if (this.checkUsername&&this.checkEmail){
    this.loginService.register(filedNew).subscribe(() => {
      alert("Đăng ký thành công !");
      this.router.navigate([""])
    })}
  }
  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            localStorage.setItem("urlImange",this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
