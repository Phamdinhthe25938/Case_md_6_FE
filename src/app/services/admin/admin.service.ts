import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enterprise} from "../../model/Enterprise";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {}

  getAllEnterPriseNotConfirm(): Observable<Enterprise[]>{
    return this.http.get<any>("http://localhost:8080/admin/getAllNotConfirm");
  }
  getAllEnterPriseConfirm(): Observable<Enterprise[]>{
    return this.http.get<any>("http://localhost:8080/admin/getAllConfirm");
  }
  findById(id:number):Observable<Enterprise>{
          return this.http.get<any>(`http://localhost:8080/admin/findEnterprise/${id}`);
     }
  confirmEnterprise(id:number):Observable<any>{
        return this.http.post<any>(`http://localhost:8080/admin/confirm/${id}`,"");
  }
  refuseConfirmEnterprise(id:number,string:string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/admin/refuseConfirm/${id}/${string}`,"");

  }
}
