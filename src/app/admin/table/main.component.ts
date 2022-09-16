import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin/admin.service";
import {Enterprise} from "../../model/Enterprise";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-mainEnterprise',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  enterprisesNotConfirm !: Enterprise[];
  enterprisesConfirm!: Enterprise[];
  enterpriseDeltail!: Enterprise;
  idBan!:number;

  constructor(private adminService:AdminService,private router:Router,private enterpriseService:EnterpriseService,private loginService:LoginService) {

  }

  ngOnInit(): void {

    this.adminService.getAllEnterPriseNotConfirm().subscribe((data)=>{
      this.enterprisesNotConfirm=data;
    })
    this.adminService.getAllEnterPriseConfirm().subscribe((data)=>{
      this.enterprisesConfirm=data;
    })
  }
  logout(){
      this.loginService.logout();
      this.router.navigate(["/login"])
  }
  toTurnoverComponet(){
    this.router.navigate(["/turnover"]);
  }
  reasonForm= new FormGroup({
    reasonRefusal: new FormControl("", Validators.required),
  })
  getAllNotConfirm(){
    this.adminService.getAllEnterPriseNotConfirm().subscribe((data)=>{
      this.enterprisesNotConfirm=data;
    })
  }
  getAllConfirm(){
    this.adminService.getAllEnterPriseConfirm().subscribe((data)=>{
      this.enterprisesConfirm=data;
    })
  }
  confirm(id:number){
      this.adminService.confirmEnterprise(id).subscribe(()=>{
          alert("Xác thực thành công !");
          this.getAllNotConfirm();
          this.getAllConfirm();
          this.router.navigate(["/admin/show"]);
      })
  }
  refuseInput(){
    // console.log(this.reasonRefusal);
      // @ts-ignore
    document.getElementById("refuseInput").style.display="block";
    // @ts-ignore
    document.getElementById("btnConfirmRefusal").style.display="block";
    // @ts-ignore
    document.getElementById("btnRefusal").style.display="none";
    // @ts-ignore
    document.getElementById("confirm").style.display="none";
  }
  reset(){
     this.reasonForm.value.reasonRefusal="";
    // @ts-ignore
    document.getElementById("refuseInput").style.display="none";
    // @ts-ignore
    document.getElementById("btnConfirmRefusal").style.display="none";
    // @ts-ignore
    document.getElementById("btnRefusal").style.display="block";
    // @ts-ignore
    document.getElementById("confirm").style.display="block";
  }
  refuseConfirm(id:number){
    let string = this.reasonForm.value.reasonRefusal;
   let string1 = String(string);
    this.adminService.refuseConfirmEnterprise(id,string1).subscribe(()=>{
      alert("ok ban oi")
      this.reset();
      this.getAllNotConfirm();
      this.getAllConfirm();
    })
  }
  findById(id:number){
    this.adminService.findById(id).subscribe((data)=>{
      this.enterpriseDeltail=data;
    })
  }

}
