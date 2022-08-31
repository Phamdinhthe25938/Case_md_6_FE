import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../services/admin/admin.service";
import {Enterprise} from "../../../model/Enterprise";
import {Field} from "../../../model/Field";
<<<<<<< HEAD
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

=======
import {Router} from "@angular/router";
>>>>>>> 119ad7f5fa86aeead53eff8defe1aa0cd3f4c480

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

<<<<<<< HEAD
  constructor(private loginService: LoginService,private storage: AngularFireStorage) {
=======
  constructor(private loginService: LoginService,private router :Router) {
>>>>>>> 119ad7f5fa86aeead53eff8defe1aa0cd3f4c480
  }

  ngOnInit(): void {
    this.loginService.findAll().subscribe((data) => {
      this.fields = data;
    })
  }

  registerForm = new FormGroup({
    nameEnterprise: new FormControl("", Validators.required),
    codeConfirmEnterprise: new FormControl("", Validators.required),
    gmailEnterprise: new FormControl("", Validators.required),
    imgEnterprise: new FormControl("", Validators.required),
    addressMainEnterprise: new FormControl("", Validators.required),
    idField: new FormControl(),
    describeEnterprise: new FormControl("", Validators.required),
  })

  register() {
    let urlImage= localStorage.getItem("urlImange")
    let filed = this.registerForm.value;
    let filedNew = {
      nameEnterprise: filed.nameEnterprise,
      codeConfirmEnterprise: filed.codeConfirmEnterprise,
      gmailEnterprise: filed.gmailEnterprise,
      imgEnterprise: urlImage,
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
