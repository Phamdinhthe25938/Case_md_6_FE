import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { MainEnterpriseComponent } from './main-enterprise/main-enterprise.component';


@NgModule({
  declarations: [
    MainEnterpriseComponent
  ],
  imports: [
    CommonModule,
    EnterpriseRoutingModule
  ]
})
export class EnterpriseModule { }
