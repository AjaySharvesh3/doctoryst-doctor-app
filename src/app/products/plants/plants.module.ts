import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductPlantsDashboardComponent} from "./components/product-plants-dashboard/product-plants-dashboard.component";
import {ProductPlantsListComponent} from "./components/product-plants-list/product-plants-list.component";
import {AddEditPlantsCategoryComponent} from "./components/add-edit-plants-category/add-edit-plants-category.component";
import {RouterModule} from "@angular/router";
import { EnableDisablePlantsCategoryComponent } from './components/enable-disable-plants-category/enable-disable-plants-category.component';
import { DeletePlantsCategoryComponent } from './components/delete-plants-category/delete-plants-category.component';



@NgModule({
  declarations: [
    ProductPlantsDashboardComponent,
    ProductPlantsListComponent,
    AddEditPlantsCategoryComponent,
    EnableDisablePlantsCategoryComponent,
    DeletePlantsCategoryComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TooltipModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PlantsModule { }
