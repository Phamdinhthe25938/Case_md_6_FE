import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin/admin.service";
import {Enterprise} from "../../model/Enterprise";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mainEnterprise',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  enterprisesNotConfirm !: Enterprise[];
  enterprisesConfirm!: Enterprise[];
  enterpriseDeltail!: Enterprise;

  constructor(private adminService:AdminService,private router:Router,private adminService1:AdminService) {

  }

  ngOnInit(): void {

    this.adminService.getAllEnterPriseNotConfirm().subscribe((data)=>{
      this.enterprisesNotConfirm=data;
    })
    this.adminService.getAllEnterPriseConfirm().subscribe((data)=>{
      this.enterprisesConfirm=data;
    })
  }
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
      // @ts-ignore
    document.getElementById("refuseInput").style.display="block";
  }
  refuseConfirm(id:number,string :string){
    this.adminService.refuseConfirmEnterprise(id,string).subscribe(()=>{
    })
  }
  findById(id:number){
    this.adminService1.findById(id).subscribe((data)=>{
      this.enterpriseDeltail=data;
    })
  }
}
