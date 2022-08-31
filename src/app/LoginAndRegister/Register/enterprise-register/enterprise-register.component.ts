import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../services/admin/admin.service";
import {Enterprise} from "../../../model/Enterprise";
import {Field} from "../../../model/Field";
import {Router} from "@angular/router";

@Component({
  selector: 'app-enterprise-register',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.css']
})
export class EnterpriseRegisterComponent implements OnInit {
  enterpriseDeltal!: Enterprise;

  fields!: Field[];

  constructor(private loginService: LoginService,private router :Router) {
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
    this.loginService.register(filedNew).subscribe(() => {
      alert("Đăng ký thành công !");
      this.router.navigate([""])
    })
  }


}
