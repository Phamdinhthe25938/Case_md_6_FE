import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { MainEnterpriseComponent } from './main-enterprise/main-enterprise.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";


@NgModule({
  declarations: [
    MainEnterpriseComponent
  ],
    imports: [
        CommonModule,
        EnterpriseRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class EnterpriseModule { }
