import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {PostEnterprise} from "../../model/PostEnterprise";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AllService} from "../../services/all.service";
import {LoginService} from "../../services/login/login.service";
import {finalize, Observable} from "rxjs";
import {Field} from "../../model/Field";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // fields!: Field[];

  title = "cloudsSorage";
  fb: string = "";
  downloadURL: Observable<string> | undefined;
  constructor(private router:Router,private userService :UserService,private storage: AngularFireStorage,private loginService:LoginService,private allService:AllService) { }

  postEnterpriseOffer!:PostEnterprise[];
  ngOnInit(): void {
     this.listPostByOderPriority();
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
  onFileSelected({event}: { event: any }){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  listPostByOderPriority(){
      return this.userService.listPostByOderPriority().subscribe((data)=>{
             this.postEnterpriseOffer=data;
      })
  }
  saveCvForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.pattern("[A-Za-z]+")]),
    telephone: new FormControl("", [Validators.required,Validators.pattern("^0[0-9]+")]),
    mail : new FormControl("", [Validators.required,Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
    imgCV:new FormControl()
  })
  async saveCV(){
      if(this.saveCvForm.valid){
        this.saveCvForm.get("imgCV")?.setValue(this.fb);
          let idLogin = this.loginService.getUserToken().id;
          if(this.saveCvForm.value.imgCV===""){
               alert("Vui lòng upload Cv")
          }else{
            let cvFormValue = this.saveCvForm.value;
            let Cv={
              name: cvFormValue.name,
              telephone:cvFormValue.telephone,
              mail:cvFormValue.mail,
              imgCV:cvFormValue.imgCV,
              appUser:{
                id: idLogin
              }
            }
            this.userService.saveCv(Cv).subscribe(()=>{
              alert("ok la");
            })
          }
      }else{
        alert("Lỗi Form!");
      }
  }
}

