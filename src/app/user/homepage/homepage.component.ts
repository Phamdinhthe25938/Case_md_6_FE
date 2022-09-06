import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AllService} from "../../services/all.service";
import {LoginService} from "../../services/login/login.service";
import {finalize, Observable} from "rxjs";
import {Field} from "../../model/Field";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // fields!: Field[];
  // title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  constructor(private userService :UserService,private storage: AngularFireStorage,private loginService:LoginService,private allService:AllService) { }

  postEnterpriseOffer!:PostEnterprise[];
  ngOnInit(): void {
     this.listPostByOderPriority();
  }
  upImgCv({event}: { event: any }){
    this.allService.onFileSelected(event);
    this.fb = this.allService.onFileSelected(event);
    console.log("nacumi"+ this.fb);
  }

  listPostByOderPriority(){
      return this.userService.listPostByOderPriority().subscribe((data)=>{
             this.postEnterpriseOffer=data;
      })
  }
  saveCvForm = new FormGroup({
    name: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required),
    mail : new FormControl("", Validators.required),
    imgCV:new FormControl()
  })
  saveCV(){
      if(this.saveCvForm.valid){
        let idLogin = this.loginService.getUserToken().id;
        this.saveCvForm.get("imgCV")?.setValue(this.allService.fb);
        let cvFormValue = this.saveCvForm.value;
        let Cv= {
          name: cvFormValue.name,
          telephone:cvFormValue.telephone,
          mail:cvFormValue.mail,
          img:cvFormValue.imgCV,
          appUser:{
            id: idLogin
          }
        }
        this.userService.saveCv(Cv).subscribe(()=>{
          alert("ok la");
        })
      }

  }
}
