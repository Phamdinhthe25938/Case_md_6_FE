import {Time} from "@angular/common";
import {Field} from "./Field";

export class Enterprise{
  idEnterprise:number;
  nameEnterprise:string;
  codeConfirmEnterprise:string;
  gmailEnterprise:string;
  imgEnterprise:string;
  addressMainEnterprise:string;
  fieldEnterprise:Field;
  describeEnterprise:string;
  passwordEnterprise:string;
  numberViEnterprise:string;
  codeViEnterprise:string;
  viEnterprise:number;
  statusEnterprise:boolean;
  timeRegisterEnterprise:Time;
  dateRegisterEnterprise:Date;
  statusConfirm:boolean;
  ratesEnterprise:number;


  constructor(ratesEnterprise:number,idEnterprise: number, nameEnterprise: string, codeConfirmEnterprise: string, gmailEnterprise: string, imgEnterprise: string, addressMainEnterprise: string, fieldEnterprise: Field, describeEnterprise: string, passwordEnterprise: string, numberViEnterprise: string, codeViEnterprise: string, viEnterprise: number, statusEnterprise: boolean, timeRegisterEnterprise: Time, dateRegisterEnterprise: Date, statusConfirm: boolean) {
    this.idEnterprise = idEnterprise;
    this.nameEnterprise = nameEnterprise;
    this.codeConfirmEnterprise = codeConfirmEnterprise;
    this.gmailEnterprise = gmailEnterprise;
    this.imgEnterprise = imgEnterprise;
    this.addressMainEnterprise = addressMainEnterprise;
    this.fieldEnterprise = fieldEnterprise;
    this.describeEnterprise = describeEnterprise;
    this.passwordEnterprise = passwordEnterprise;
    this.numberViEnterprise = numberViEnterprise;
    this.codeViEnterprise = codeViEnterprise;
    this.viEnterprise = viEnterprise;
    this.statusEnterprise = statusEnterprise;
    this.timeRegisterEnterprise = timeRegisterEnterprise;
    this.dateRegisterEnterprise = dateRegisterEnterprise;
    this.statusConfirm = statusConfirm;
    this.ratesEnterprise=ratesEnterprise;
  }
}
