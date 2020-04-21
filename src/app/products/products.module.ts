import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDashboardComponent } from './products-dashboard/components/products-dashboard/products-dashboard.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {PlantsModule} from "./plants/plants.module";



@NgModule({
  declarations: [
    ProductsDashboardComponent
  ],
  imports: [
    CommonModule,
    PlantsModule,
    ProductsRoutingModule,
    FontAwesomeModule,
    TooltipModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
