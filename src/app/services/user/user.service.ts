import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostEnterprise} from "../../model/PostEnterprise";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  listPostByOderPriority():Observable<PostEnterprise[]>{
    return this.http.get<any>(`http://localhost:8080/user/listPostByOderPriority`,);
  }
}
