import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./LoginAndRegister/login/login.component";
import {
  EnterpriseRegisterComponent
} from "./LoginAndRegister/Register/enterprise-register/enterprise-register.component";
import {AdminGuard} from "./admin/admin.guard";
import {EnterpriseGuard} from "./enterprise/enterprise.guard";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:EnterpriseRegisterComponent},
  {path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(module => module.AdminModule),
  canActivate: [AdminGuard]
},
  {path: 'enterprise', loadChildren: () => import('../app/enterprise/enterprise.module').then(module => module.EnterpriseModule),
    canActivate: [EnterpriseGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
