import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../services/admin/admin.service";
import {Enterprise} from "../../../model/Enterprise";
import {Field} from "../../../model/Field";
import {Router} from "@angular/router";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {finalize, Observable} from "rxjs";
import {AppUser} from "../../../model/AppUser";
@Component({
  selector: 'app-enterprise-register',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.css']
})
export class EnterpriseRegisterComponent implements OnInit {
  enterpriseDeltal!: Enterprise;

  fields!: Field[];
  appUser!: AppUser[];
  enterprise!: Enterprise[];
  checkUsername!: boolean ;
  checkEmail!: boolean
  title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  constructor(private loginService: LoginService,private router :Router,private storage: AngularFireStorage) {}
  onFileSelected({event}: { event: any }) {
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
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  ngOnInit(): void {
    this.checkEmail=true;
    this.loginService.findAllField().subscribe((data) => {
      this.fields = data;
    })
  }

  registerForm = new FormGroup({
    nameEnterprise: new FormControl("", Validators.required),
    codeConfirmEnterprise: new FormControl("", Validators.required),
    gmailEnterprise: new FormControl("", Validators.required),
    imgEnterprise: new FormControl(),
    addressMainEnterprise: new FormControl("", Validators.required),
    idField: new FormControl(),
    describeEnterprise: new FormControl("", Validators.required),
  })

  register() {
    let filed = this.registerForm.value;
     this.registerForm.get("imgEnterprise")?.setValue(this.fb);
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
    this.loginService.register(filedNew).subscribe(() => {
      alert("Đăng ký thành công !");
      this.router.navigate([""])
    })
  }
checkEmailE(){
  let email=this.registerForm.value.gmailEnterprise
  console.log("email")
  console.log(email)
  this.checkEmail=true;
  for (let i = 0; i < this.appUser.length; i++) {
    if (email==this.appUser[i].email){
      this.checkEmail=false
      break;
    }
  }
  for (let i = 0; i < this.enterprise.length; i++){
    if (email===this.enterprise[i].gmailEnterprise){
      this.checkEmail=false
      break;
    }
  }
  console.log(this.checkEmail)
}
}
