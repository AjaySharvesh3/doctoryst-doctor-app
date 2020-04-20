import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProfileDashboardComponent } from './components/store-profile-dashboard/store-profile-dashboard.component';
import {StoreProfileRoutingModule} from "./store-profile-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { StoreProfileContentComponent } from './components/store-profile-content/store-profile-content.component';
import {LayoutModule} from "../../common/layout/layout.module";
import { VerificationsComponent } from './components/verifications/verifications.component';
import {StoreProductsComponent} from "./components/store-products/store-products.component";



@NgModule({
  declarations: [
    StoreProfileDashboardComponent,
    StoreProfileContentComponent,
    VerificationsComponent,
    StoreProductsComponent
  ],
  imports: [
    CommonModule,
    StoreProfileRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    LayoutModule
  ],
  exports: [
    StoreProfileDashboardComponent,
    StoreProfileContentComponent,
    VerificationsComponent,
    StoreProductsComponent
  ]
})
export class StoreProfileModule { }
