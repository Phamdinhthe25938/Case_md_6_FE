import {Component, OnInit} from '@angular/core';
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {Enterprise} from "../../model/Enterprise";
import {LoginService} from "../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {min} from "rxjs";
import {FormJob} from "../../model/FormJob";
import {Regime} from "../../model/Regime";
import {Field} from "../../model/Field";

@Component({
  selector: 'app-main-enterprise',
  templateUrl: './main-enterprise.component.html',
  styleUrls: ['./main-enterprise.component.css']
})
export class MainEnterpriseComponent implements OnInit {

  enterpriseLogin!: Enterprise;
  listFormJob!: FormJob[];
  listRegime!: Regime[];
  listField!: Field[];

  constructor(private enterpriseService: EnterpriseService, private loginService: LoginService) {
  }

  enterpriseLoginFunction(): void {
    let username = this.loginService.getUserToken().username;
    this.enterpriseService.findEnterpriseByName(username).subscribe((data) => {
      console.log(data);
      this.enterpriseLogin = data;
      console.log(this.enterpriseLogin.statusEnterprise);
    })

  }

  ngOnInit(): void {
    this.enterpriseLoginFunction();
    this.enterpriseService.findAllFormJob().subscribe((data) => {
      this.listFormJob = data;
    })
    this.enterpriseService.findAllRegime().subscribe((data) => {
      this.listRegime = data;
    })
    this.loginService.findAllField().subscribe((data) => {
      this.listField = data;
    })
  }

  setStatusEnterpriseTo1() {
    this.enterpriseService.setStatusEnterpriseTo1(this.enterpriseLogin.idEnterprise).subscribe(() => {
    })
  }

  inputCodeViWalletForm() {
    if (this.walletForm.value.codeVi !== this.enterpriseLogin.codeViEnterprise) {
      // @ts-ignore
      document.getElementById('codeVi1').style.display = "block";
      // @ts-ignore
      document.getElementById('codeVi2').style.display = "none";
    } else {
      // @ts-ignore
      document.getElementById('codeVi1').style.display = "none";
      // @ts-ignore
      document.getElementById('codeVi2').style.display = "block";
    }
  }

  walletForm = new FormGroup({
    codeVi: new FormControl("", Validators.required),
    viEnterprise: new FormControl(0, Validators.min(5))
  })
  changeCodeViForm = new FormGroup({
    codeViOld: new FormControl("", Validators.required),
    codeViNew: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
    codeViNewAgain: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
  })
  createPostForm = new FormGroup({
        namePostEnterprise: new FormControl("", Validators.required),
        addressMainEnterprise: new FormControl("", Validators.required),
        idField: new FormControl(),
        idFormJob: new FormControl(),
        idRegime: new FormControl(),
        salarySmallPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0)]),
        salaryBigPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0)]),
        vacanciesPostEnterprise: new FormControl("", Validators.required),
        expirationDatePostEnterprise: new FormControl("", Validators.required),
        describePostEnterprise: new FormControl("", Validators.required),
      })

  createPost() {
    let  createPostForm = this.createPostForm.value;
    let  postEnterprise = {
      namePostEnterprise: createPostForm.namePostEnterprise,
      addressMainEnterprise: createPostForm.addressMainEnterprise,
      field: {
        idField: createPostForm.idField
      },
      regime: {
        idRegime: createPostForm.idRegime
      },
      formJobPostEnterprise: {
        idFormJob: createPostForm.idFormJob
      },
      salarySmallPostEnterprise: createPostForm.salarySmallPostEnterprise,
      salaryBigPostEnterprise: createPostForm.salaryBigPostEnterprise,
      vacanciesPostEnterprise: createPostForm.vacanciesPostEnterprise,
      expirationDatePostEnterprise: createPostForm.expirationDatePostEnterprise,
      describePostEnterprise: createPostForm.describePostEnterprise,
      enterprise: {
        idEnterprise: this.enterpriseLogin.idEnterprise,
      }
    }
    this.enterpriseService.savePost(postEnterprise).subscribe(() => {
      alert("create thành công!")
      this.enterpriseLoginFunction();
    })
  }

  confirmCreatePost() {
    if (!this.enterpriseLogin.statusEnterprise) {
      alert("Tài khoản của bạn không đủ tiền để đăng bài mới vui lòng nạp thêm !")
    } else {
      let date = new Date();


    }
  }

  rechargeWallet() {
    if (this.walletForm.value.codeVi === this.enterpriseLogin.codeViEnterprise) {
      let id = this.enterpriseLogin.idEnterprise;
      console.log(this.walletForm.value)
      this.enterpriseService.rechargeWallet(id, Number(this.walletForm.value.viEnterprise)).subscribe(() => {
        alert("Nạp ví thành công !")
        this.walletForm = new FormGroup({
          codeVi: new FormControl("", Validators.required),
          viEnterprise: new FormControl(0, Validators.required)
        })
        this.enterpriseLoginFunction();
      })
      // @ts-ignore
      document.getElementById('codeVi2').style.display = "none";
    } else {
      alert("Mã ví không hợp lệ!")
    }
  }

  inputCodeViChangeCodeViForm() {
    if (this.changeCodeViForm.value.codeViOld !== this.enterpriseLogin.codeViEnterprise) {
      // @ts-ignore
      document.getElementById("codeVi3").style.display = "block";
      // @ts-ignore
      document.getElementById('codeVi4').style.display = "none";
    } else {
      // @ts-ignore
      document.getElementById('codeVi3').style.display = "none";
      // @ts-ignore
      document.getElementById('codeVi4').style.display = "block";
    }
  }

  codeViAgain() {
    if (this.changeCodeViForm.value.codeViNewAgain === this.changeCodeViForm.value.codeViNew) {
      // @ts-ignore
      document.getElementById("codeViNewAgain2").style.display = "block";

      // @ts-ignore
      document.getElementById("codeViNewAgain1").style.display = "none";
    } else {
      // @ts-ignore
      document.getElementById("codeViNewAgain2").style.display = "none";

      // @ts-ignore
      document.getElementById("codeViNewAgain1").style.display = "block";
    }
  }

  changeCodeVi() {
    let id = this.enterpriseLogin.idEnterprise;
    if (this.changeCodeViForm.value.codeViNewAgain === this.changeCodeViForm.value.codeViNew && this.changeCodeViForm.value.codeViOld === this.enterpriseLogin.codeViEnterprise) {
      this.enterpriseService.changeCodeVi(id, String(this.changeCodeViForm.value.codeViNew)).subscribe(() => {
        alert("Thay đổi mã ví thành công");
        this.changeCodeViForm = new FormGroup({
          codeViOld: new FormControl("", Validators.required),
          codeViNew: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
          codeViNewAgain: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
        })
      })
    } else {
      alert("Vui lòng kiểm tra lại có gì đó chưa đúng!")
    }
  }

}
