import {Component, OnInit} from '@angular/core';
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {Enterprise} from "../../model/Enterprise";
import {LoginService} from "../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {min} from "rxjs";
import {FormJob} from "../../model/FormJob";
import {Regime} from "../../model/Regime";
import {Field} from "../../model/Field";
import {PostEnterprise} from "../../model/PostEnterprise";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-enterprise',
  templateUrl: './main-enterprise.component.html',
  styleUrls: ['./main-enterprise.component.css']
})
export class MainEnterpriseComponent implements OnInit {

  enterpriseLogin!: Enterprise;
  listFormJob!: FormJob[];
  listRegime!: Regime[];
  listField!: Field[];
  listPostByIdEnterprise!:PostEnterprise[];
  postEnterpriseKey!: PostEnterprise;
  constructor(private router:Router, private enterpriseService: EnterpriseService, private loginService: LoginService) {
  }
  logout(){
     this.loginService.logout();
     this.router.navigate(["/login"]);
  }
  enterpriseLoginFunction(): void {
    let username = this.loginService.getUserToken().username;
    this.enterpriseService.findEnterpriseByName(username).subscribe((data) => {
      console.log(data);
      this.enterpriseLogin = data;
      console.log(this.enterpriseLogin.statusEnterprise);
      this.getAllPostByEnterprise();
    })

  }
  getAllPostByEnterprise(){
    this.enterpriseService.findAllByIdEnterprise(this.enterpriseLogin.idEnterprise).subscribe((data)=>{
      this.listPostByIdEnterprise=data;
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
    viEnterprise: new FormControl(0, [Validators.required,Validators.pattern("^[0-9]+"),Validators.min(5)])
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
        salarySmallPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
        salaryBigPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
        vacanciesPostEnterprise: new FormControl("", Validators.required),
        expirationDatePostEnterprise: new FormControl("", Validators.required),
        describePostEnterprise: new FormControl("", Validators.required),
      })
  createPost() {
    if (this.createPostForm.valid) {
      let createPostForm = this.createPostForm.value;
      let postEnterprise = {
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
        alert("Tạo bài  thành công!")
        this.enterpriseLoginFunction();
        this.createPostForm = new FormGroup({
          namePostEnterprise: new FormControl("", Validators.required),
          addressMainEnterprise: new FormControl("", Validators.required),
          idField: new FormControl(),
          idFormJob: new FormControl(),
          idRegime: new FormControl(),
          salarySmallPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
          salaryBigPostEnterprise: new FormControl(0, [Validators.required, Validators.min(0),Validators.pattern("^[0-9]+")]),
          vacanciesPostEnterprise: new FormControl("", Validators.required),
          expirationDatePostEnterprise: new FormControl("", Validators.required),
          describePostEnterprise: new FormControl("", Validators.required),
        })
      })
    } else {
      alert("Form khong hop le !");
    }
  }
  confirmCreatePost() {
    if (!this.enterpriseLogin.statusEnterprise) {
      alert("Tài khoản của bạn không đủ tiền để đăng bài mới vui lòng nạp thêm !")
    } else {
        if(this.validateExpirationDate() && this.validatesalaryBigPostEnterprise()){
          this.createPost();
        }else {
          alert("Vui lòng kiểm tra lại form");
        }
    }
  }
  rechargeWallet() {
    if(this.walletForm.valid){
      if (this.walletForm.value.codeVi === this.enterpriseLogin.codeViEnterprise) {
        let id = this.enterpriseLogin.idEnterprise;
        console.log(this.walletForm.value)
        this.enterpriseService.rechargeWallet(id, Number(this.walletForm.value.viEnterprise)).subscribe(() => {
          alert("Nạp ví thành công !")
          this.walletForm = new FormGroup({
            codeVi: new FormControl("", Validators.required),
            viEnterprise: new FormControl(0, [Validators.required,Validators.pattern("^[0-9]+")])
          })
          this.enterpriseLoginFunction();
        })
        // @ts-ignore
        document.getElementById('codeVi2').style.display = "none";
      } else {
        alert("Mã ví không hợp lệ!")
      }
    }else {
      alert("Dữ liệu form không hợp lệ !")
    }

  }
  changeCodeVi() {
      if(this.changeCodeViForm.valid){
        let id = this.enterpriseLogin.idEnterprise;
        if (this.changeCodeViForm.value.codeViNewAgain === this.changeCodeViForm.value.codeViNew && this.changeCodeViForm.value.codeViOld === this.enterpriseLogin.codeViEnterprise) {
          this.enterpriseService.changeCodeVi(id, String(this.changeCodeViForm.value.codeViNew)).subscribe(() => {
            alert("Thay đổi mã ví thành công");
            this.changeCodeViForm = new FormGroup({
              codeViOld: new FormControl("", Validators.required),
              codeViNew: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
              codeViNewAgain: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
            })
            this.enterpriseLoginFunction();
          })
        } else {
          alert("Vui lòng kiểm tra lại có gì đó chưa đúng!")
        }
      }
      else {
        alert("Dữ liệu form không hợp lệ !")
      }
  }

  // Validate các forrm

  validatesalaryBigPostEnterprise():boolean{
      if(Number(this.createPostForm.value.salarySmallPostEnterprise)>=Number(this.createPostForm.value.salaryBigPostEnterprise)){
        // @ts-ignore
        document.getElementById("validateSalary").style.display="block";
        return false;
      }
      else {
        // @ts-ignore
        document.getElementById("validateSalary").style.display="none";
        return true;
      }
  }
  validateInputCodeViChangeCodeViForm() {
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
  validateExpirationDate() {
    let dateNow = new Date();
    let date = "'" + this.createPostForm.value.expirationDatePostEnterprise + "'";
    let dateExpirationDate = new Date(date);
    if (dateExpirationDate > dateNow) {
      // @ts-ignore
      document.getElementById("expirationDate").style.display = "none";
      return true;
    } else {
      // @ts-ignore
      document.getElementById("expirationDate").style.display = "block";
      return false;
    }
  }
  validateCodeViAgain() {
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

  editStatus(id: number){
    this.enterpriseService.findPostById(id).subscribe((data)=>{
        this.postEnterpriseKey =data;
        if(!this.postEnterpriseKey.statusPostEnterprise){
             this.enterpriseService.openKeyPost(id).subscribe(()=>{
               alert("Mở khóa thành công !")
               this.getAllPostByEnterprise();
             })
        }else {
          this.enterpriseService.statusPost(id).subscribe(()=>{
            alert("Khóa thành công !")
            this.getAllPostByEnterprise();
          })
        }
    })
  }
}
