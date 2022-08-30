import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../LoginAndRegister/login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
