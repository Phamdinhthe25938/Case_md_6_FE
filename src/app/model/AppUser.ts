export class AppUser{
  private id:number;
  private username:string;
  private email:string;


  constructor(id: number, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}
