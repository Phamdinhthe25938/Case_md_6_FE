import {UserToken} from "./UserToken";
import {PostEnterprise} from "./PostEnterprise";

export class UserApply {
  idUserApply:number
  nameCV:string
  numberCV:string
  mailCv:string
  imgCV:string
  appUser:UserToken
  postEnterprise:PostEnterprise


  constructor(idUserApply: number, nameCV: string, numberCV: string, mailCv: string, imgCV: string, appUser: UserToken, postEnterprise: PostEnterprise) {
    this.idUserApply = idUserApply;
    this.nameCV = nameCV;
    this.numberCV = numberCV;
    this.mailCv = mailCv;
    this.imgCV = imgCV;
    this.appUser = appUser;
    this.postEnterprise = postEnterprise;
  }
}
