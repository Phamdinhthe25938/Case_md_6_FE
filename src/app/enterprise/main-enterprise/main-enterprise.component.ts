import { Component, OnInit } from '@angular/core';
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {Enterprise} from "../../model/Enterprise";
import {LoginService} from "../../services/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  change(){
    if(this.walletForm.value.codeVi!==this.enterpriseLogin.codeViEnterprise){
      // @ts-ignore
      document.getElementById('codeVi').style.display="block";
      // @ts-ignore
      document.getElementById('codeVi1').style.display="none";
    }
    else {
      // @ts-ignore
      document.getElementById('codeVi').style.display="none";
      // @ts-ignore

      document.getElementById('codeVi1').style.display="block";
    }
  }
  walletForm = new FormGroup({
    codeVi: new FormControl("",Validators.required),
    viEnterprise: new FormControl(0, Validators.required)
  })
  rechargeWallet(){
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
  }
}
