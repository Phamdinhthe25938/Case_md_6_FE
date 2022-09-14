import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-deltal',
  templateUrl: './deltal.component.html',
  styleUrls: ['./deltal.component.css']
})
export class DeltalComponent implements OnInit {
  lisApply!:PostEnterprise[];
  constructor(private userService: UserService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.userService.showListApply(this.loginService.getUserToken().id).subscribe((data) => {
      this.lisApply = data;
    })
  }
}
