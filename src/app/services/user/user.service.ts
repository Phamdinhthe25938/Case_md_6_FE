import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostEnterprise} from "../../model/PostEnterprise";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  listPostByOderPriority(page:number):Observable<PostEnterprise[]>{
    return this.http.get<any>(`http://localhost:8080/user/listPostByOderPriority/${page}`);
  }
  saveCv(cvUser:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/user/saveCvUser/`,cvUser);
  }
  postDetail(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/user/postDetail/${id}`);
  }
  findCvByIdUser(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/user/findCvByIdUser/${id}`);
  }
  saveApplyJob(userApplyJob:any){
    return this.http.post<any>(`http://localhost:8080/user/saveApplyJob`,userApplyJob);
  }
  findUserApplyByIdAppUserAndIdPost(idAppUser:number,idPost:number){
    return this.http.get<any>(`http://localhost:8080/user/findUserApplyByIdAppUserAndIdPost/${idAppUser}/${idPost}`);

  }
}
