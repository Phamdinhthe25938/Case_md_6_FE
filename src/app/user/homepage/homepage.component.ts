import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService :UserService) { }

  postEnterpriseOffer!:PostEnterprise[];

  ngOnInit(): void {
     this.listPostByOderPriority();
  }
  listPostByOderPriority(){
      return this.userService.listPostByOderPriority().subscribe((data)=>{
             this.postEnterpriseOffer=data;
      })
  }

}
