import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {LoginService} from "../../services/login/login.service";
import {EnterpriseService} from "../../services/enterprise/enterprise.service";
import {UserApply} from "../../model/UserApply";

@Component({
  selector: 'app-deltal',
  templateUrl: './deltal.component.html',
  styleUrls: ['./deltal.component.css']
})
export class DeltalComponent implements OnInit {
  lisApply!:PostEnterprise[];
  postEnterpriseDetail!:PostEnterprise;
  userApply!:UserApply;
  constructor(private userService: UserService,private enterpriseService:EnterpriseService,private loginService: LoginService) { }
  ngOnInit(): void {
    this.userService.showListApply(this.loginService.getUserToken().id).subscribe((data) => {
      this.lisApply = data;
    })
  }
  showPost(idPost: number){
    this.enterpriseService.findPostById(idPost).subscribe((data) => {
      this.postEnterpriseDetail = data;
    })
    this.userService.findImgCvApply(this.loginService.getUserToken().id,idPost).subscribe((data) => {
      this.userApply = data;

    })
  }
}
