import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./LoginAndRegister/login/login.component";
import {
  EnterpriseRegisterComponent
} from "./LoginAndRegister/Register/enterprise-register/enterprise-register.component";
import {AdminGuard} from "./admin/admin.guard";
import {EnterpriseGuard} from "./enterprise/enterprise.guard";
import {AppUserModule} from "./user/AppUser.module";
import {UserGuard} from "./user/user.guard";
import {UserRegisterComponent} from "./LoginAndRegister/Register/user-register/user-register.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registerEnterprise', component:EnterpriseRegisterComponent},
  {path: 'registerUser', component:UserRegisterComponent},
  {path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(module => module.AdminModule),
  canActivate: [AdminGuard]
},
  {path: 'enterprise', loadChildren: () => import('../app/enterprise/enterprise.module').then(module => module.EnterpriseModule),
    canActivate: [EnterpriseGuard]
  },
  {path: "user", loadChildren: () => import('../app/user/AppUser.module').then(module => module.AppUserModule),
    canActivate: [UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// @ts-ignore
export class AppRoutingModule {

}
