import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin/admin.service";
import {TransactionHistory} from "../../model/TransactionHistory";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {Enterprise} from "../../model/Enterprise";

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.css']
})
export class TurnoverComponent implements OnInit {

  constructor(private router:Router,private adminService:AdminService,private enterpriseService:EnterpriseService) { }

  transactionHistoryS !:TransactionHistory[];

  postVipByEnterpriseS!:PostEnterprise[];
  postThuongByEnterpriseS!:PostEnterprise[];
  enterpriseOderByRates!:Enterprise[];

  totalMoneyTransaction!:number;

  ngOnInit(): void {
    this.totalTransaction();
    this.listTransactionHistory();
    this.listEnterpriseOderByRates();
  }
  toTableComponent(){
      this.router.navigate(["/admin"])
  }
  listTransactionHistory(){
    this.adminService.listTransactionHistory().subscribe((data)=>{
        this.transactionHistoryS=data;
    })
  }
  listEnterpriseOderByRates(){
    this.adminService.listEnterpriseOderByRates().subscribe((data)=>{
      this.enterpriseOderByRates=data;
    })
  }
  listPostVipByEnterprise(id:number){
      this.enterpriseService.listPostVipByEnterprise(id).subscribe((data)=>{
           this.postVipByEnterpriseS =data;
      })

  }
  listPostThuongEnterprise(id:number){
    this.enterpriseService.listPostThuongByEnterprise(id).subscribe((data)=>{
         this.postThuongByEnterpriseS =data;
    })
  }
  totalTransaction(){
     this.adminService.totalTransaction().subscribe((data)=>{
           this.totalMoneyTransaction=data;
     })
  }

}