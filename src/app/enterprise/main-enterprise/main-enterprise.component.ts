import { Component, OnInit } from '@angular/core';
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {Enterprise} from "../../model/Enterprise";
import {LoginService} from "../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {min} from "rxjs";

@Component({
  selector: 'app-main-enterprise',
  templateUrl: './main-enterprise.component.html',
  styleUrls: ['./main-enterprise.component.css']
})
export class MainEnterpriseComponent implements OnInit {

  enterpriseLogin! :Enterprise;

  constructor(private enterpriseService:EnterpriseService,private loginService:LoginService) { }

  enterpriseLoginFuntion():void{
    let name = this.loginService.getUserToken().username;
    this.enterpriseService.findEnterpriseByName(name).subscribe((data)=>{
      console.log(data);
      this.enterpriseLogin=data;
    })
  }
  ngOnInit(): void {
    this.enterpriseLoginFuntion();
  }
  setStatusEnterpriseTo1(){
    this.enterpriseService.setStatusEnterpriseTo1(this.enterpriseLogin.idEnterprise).subscribe(()=>{
    })
  }
  // setStatusEnterpriseTo0(){
  //   this.enterpriseService.setStatusEnterpriseTo0(this.enterpriseLogin.idEnterprise).subscribe(()=>{
  //   })
  // }
  inputCodeViWalletForm(){
    if(this.walletForm.value.codeVi!==this.enterpriseLogin.codeViEnterprise){
      // @ts-ignore
      document.getElementById('codeVi1').style.display="block";
      // @ts-ignore
      document.getElementById('codeVi2').style.display="none";
    }
    else {
      // @ts-ignore
      document.getElementById('codeVi1').style.display="none";
      // @ts-ignore
      document.getElementById('codeVi2').style.display="block";
    }
  }
  walletForm = new FormGroup({
    codeVi: new FormControl("",Validators.required),
    viEnterprise: new FormControl(0, Validators.min(5))
  })
  changeCodeViForm=new FormGroup({
    codeViOld: new FormControl("",Validators.required),
    codeViNew: new FormControl("",[Validators.required,Validators.minLength(4),Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")] ),
    codeViNewAgain: new FormControl("", [Validators.required,Validators.minLength(4),Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
  })
  rechargeWallet(){
     if(this.walletForm.value.codeVi===this.enterpriseLogin.codeViEnterprise){
       let id= this.enterpriseLogin.idEnterprise;
       console.log(this.walletForm.value)
       this.enterpriseService.rechargeWallet(id,Number(this.walletForm.value.viEnterprise)).subscribe(()=>{
         alert("Nạp ví thành công !")
         this.walletForm = new FormGroup({
           codeVi: new FormControl("", Validators.required),
           viEnterprise: new FormControl(0, Validators.required)
         })
         this.enterpriseLoginFuntion();
       })
       // @ts-ignore
       document.getElementById('codeVi2').style.display="none";
     }
     else {
       alert("Mã ví không hợp lệ!")
     }
  }
  inputCodeViChangeCodeViForm(){
    if(this.changeCodeViForm.value.codeViOld!==this.enterpriseLogin.codeViEnterprise){
      // @ts-ignore
      document.getElementById("codeVi3").style.display="block";
      // @ts-ignore
      document.getElementById('codeVi4').style.display="none";
    }
    else {
      // @ts-ignore
      document.getElementById('codeVi3').style.display="none";
      // @ts-ignore
      document.getElementById('codeVi4').style.display="block";
    }
  }
  codeViAgain(){
     if(this.changeCodeViForm.value.codeViNewAgain===this.changeCodeViForm.value.codeViNew){
       // @ts-ignore
       document.getElementById("codeViNewAgain2").style.display="block";

       // @ts-ignore
       document.getElementById("codeViNewAgain1").style.display="none";
     }else {
       // @ts-ignore
       document.getElementById("codeViNewAgain2").style.display="none";

       // @ts-ignore
       document.getElementById("codeViNewAgain1").style.display="block";
     }
  }
  changeCodeVi(){
    let id= this.enterpriseLogin.idEnterprise;
     if(this.changeCodeViForm.value.codeViNewAgain===this.changeCodeViForm.value.codeViNew && this.changeCodeViForm.value.codeViOld===this.enterpriseLogin.codeViEnterprise){
          this.enterpriseService.changeCodeVi(id,String(this.changeCodeViForm.value.codeViNew)).subscribe(()=>{
            alert("Thay đổi mã ví thành công");
            this.changeCodeViForm=new FormGroup({
              codeViOld: new FormControl("",Validators.required),
              codeViNew: new FormControl("",[Validators.required,Validators.minLength(4),Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")] ),
              codeViNewAgain: new FormControl("", [Validators.required,Validators.minLength(4),Validators.pattern("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")]),
            })
          })
     }else {
       alert("Vui lòng kiểm tra lại có gì đó chưa đúng!")
     }
  }

}
