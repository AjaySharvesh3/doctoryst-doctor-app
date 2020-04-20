import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDashboardComponent } from './product-dashboard/components/products-dashboard/products-dashboard.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { ProductPlantsComponent } from './product-dashboard/components/product-plants/product-plants.component';



@NgModule({
  declarations: [
    ProductsDashboardComponent,
    ProductPlantsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FontAwesomeModule,
    TooltipModule
  ]
})
export class ProductsModule { }
