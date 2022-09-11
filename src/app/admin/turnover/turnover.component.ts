import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin/admin.service";
import {TransactionHistory} from "../../model/TransactionHistory";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {Enterprise} from "../../model/Enterprise";
import {TransactionWallet} from "../../model/TransactionWallet";
import {ViAdmin} from "../../model/ViAdmin";

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.css']
})
export class TurnoverComponent implements OnInit {

  constructor(private router:Router,private adminService:AdminService,private enterpriseService:EnterpriseService) { }

  transactionHistoryS !:TransactionHistory[];

  transactionHistoryNowS !:TransactionHistory[];
  postVipByEnterpriseS!:PostEnterprise[];
  postThuongByEnterpriseS!:PostEnterprise[];
  enterpriseOderByRates!:Enterprise[];

  totalMoneyTransaction!:number;

  transWallets!:TransactionWallet[];

  viAdmin! :ViAdmin;

  passViCFValue! :"";
  transWalletById!:TransactionWallet;
  idTransWallet!:number;
  imgTransWallet!:string;
  ngOnInit(): void {
    this.totalTransaction();
    this.getViAdmin()

    this.listTransactionHistory();
    // this.listTransactionHistoryByDateNow();
    this.listEnterpriseOderByRates();
    this.transWalletAll();
  }
  toTableComponent(){
      this.router.navigate(["/admin"])
  }
  transWalletAll(){
      this.adminService.listTransWallet().subscribe((data)=>{
         this.transWallets =data;
      })
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
  listTransactionHistoryByDateNow(){
      this.adminService.listTransactionHistoryByDateNow().subscribe((data)=>{
          this.transactionHistoryNowS =data;
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
  transactionDateNow(){
       // @ts-ignore
    document.getElementById("transactionDateNow").style.display="block";
    // @ts-ignore
    document.getElementById("transactionALL").style.display="none";
  }
  transactionAll(){
    // @ts-ignore
    document.getElementById("transactionDateNow").style.display="none";
    // @ts-ignore
    document.getElementById("transactionALL").style.display="block";
  }
  getViAdmin(){
      this.adminService.getViAdmin().subscribe((data)=>{
          this.viAdmin =data;
      })
  }
  getIdTransWallet(id:number){
    this.idTransWallet =id;
    this.adminService.getTransWalletById(id).subscribe((data)=>{
         this.transWalletById=data;
         if(this.viAdmin.numberMoneyVi<this.transWalletById.numberMoney){
           // @ts-ignore
           document.getElementById("notifiDkCF1").style.display="block";
         }else {
           // @ts-ignore
           document.getElementById("notifiDkCF2").style.display="block";
         }
    })
  }
  getImgTransWallet(id:number){
    this.idTransWallet =id;
    this.adminService.getTransWalletById(id).subscribe((data)=>{
      this.transWalletById=data;
      this.imgTransWallet=this.transWalletById.imgTransaction;
    })
  }
  vdICodeViConfirm():boolean{
      if(this.viAdmin.passwordVi===this.passViCFValue){
          // @ts-ignore
        document.getElementById("codeViAdmin1").style.display="none";
        // @ts-ignore
        document.getElementById("codeViAdmin2").style.display="block";
        return true;
      }
      else {
        // @ts-ignore
        document.getElementById("codeViAdmin1").style.display="block";
        // @ts-ignore
        document.getElementById("codeViAdmin2").style.display="none";
        return false;
      }
  }
  transWalletDetal(id:number){
    this.adminService.getTransWalletById(id).subscribe((data)=>{
      this.transWalletById=data;
    })
  }
  confirmTransWallet(){
    let id = this.idTransWallet;
       if(this.vdICodeViConfirm()){
         this.adminService.getTransWalletById(id).subscribe((data)=>{
             this.transWalletById=data;
             if(this.viAdmin.numberMoneyVi>this.transWalletById.numberMoney){
               this.adminService.confirmTransWallet(id).subscribe(()=>{
                 alert("Xác nhận thành công !");
                 this.getViAdmin();
               })
             }
             else {
               alert("Tài khoản của bạn không đủ tiền để xác thực giao dịch này !");
               this.passViCFValue="";
               // @ts-ignore
               document.getElementById("codeViAdmin1").style.display="none";
             }
         })

       }
       else {
         alert("Mã vi không hợp lệ !");
       }
  }
}
