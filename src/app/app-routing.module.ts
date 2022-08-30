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


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component:EnterpriseRegisterComponent},
  {path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(module => module.AdminModule),
  canActivate: [AdminGuard]
},
  {path: 'enterprise', loadChildren: () => import('../app/enterprise/enterprise.module').then(module => module.EnterpriseModule),
    canActivate: [EnterpriseGuard]
  },
  {path: 'user', loadChildren: () => import('../app/user/AppUser.module').then(module => module.AppUserModule),
    canActivate: [UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
