import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin/admin.service";
import {TransactionHistory} from "../../model/TransactionHistory";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {PostEnterprise} from "../../model/PostEnterprise";

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


  ngOnInit(): void {
    this.listTransactionHistory();
  }
  toTableComponent(){
      this.router.navigate(["/admin"])
  }
  listTransactionHistory(){
    this.adminService.listTransactionHistory().subscribe((data)=>{
        this.transactionHistoryS=data;
    })
  }
  listPostVipByEnterprise(id:number):PostEnterprise[]{
      this.enterpriseService.listPostVipByEnterprise(id).subscribe((data)=>{
          this.postVipByEnterpriseS=data;
      })
    return this.postVipByEnterpriseS;
  }
  listPostThuongEnterprise(id:number):PostEnterprise[]{
    this.enterpriseService.listPostThuongByEnterprise(id).subscribe((data)=>{
      this.postThuongByEnterpriseS=data;
    })
    return this.postThuongByEnterpriseS;
  }
}
