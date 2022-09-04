import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enterprise} from "../../model/Enterprise";
import {FormJob} from "../../model/FormJob";
import {Regime} from "../../model/Regime";
import {PostEnterprise} from "../../model/PostEnterprise";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private http:HttpClient) { }

  getViByIdEnterprise(id:number): Observable<number>{
    return this.http.get<any>(`http://localhost:8080/enterprise/vi/${id}`);
  }
  findEnterpriseByName(name:string):Observable<Enterprise>{
     return this.http.get<any>(`http://localhost:8080/enterprise/findEnterprise/${name}`)
  }
  findEnterpriseById(id:number):Observable<Enterprise>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findEnterpriseId/${id}`)
  }
  rechargeWallet(id:number,numberMoney:number):Observable<Enterprise>{
    return this.http.post<any>(`http://localhost:8080/enterprise/rechargeWallet/${id}/${numberMoney}`,"");
  }
  changeCodeVi(id:number,codeVi:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/enterprise/changeCodeVi/${id}/${codeVi}`,"");
  }
  setStatusEnterpriseTo1(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/setStatusEnterpriseTo1/${id}`,);
  }
  setStatusEnterpriseTo0(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/setStatusEnterpriseTo0/${id}`,);
  }
  findAllFormJob():Observable<FormJob[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findAllFormJob`,);
  }
  findAllRegime():Observable<Regime[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findAllRegime`,);
  }
  savePost(post:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/enterprise/savePost`,post);
  }
  findAllByIdEnterprise(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/enterprise/findAllByIdEnterprise/${id}`,);
  }
  listPostVipByEnterprise(id:number):Observable<PostEnterprise[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/listPostVipByEnterprise/${id}`,);

  }
  listPostThuongByEnterprise(id:number):Observable<PostEnterprise[]>{
    return this.http.get<any>(`http://localhost:8080/enterprise/listPostThuongByEnterprise/${id}`,);
  }
}
