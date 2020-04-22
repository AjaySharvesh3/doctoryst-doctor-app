import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryDashboardComponent } from './components/product-category-dashboard/product-category-dashboard.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { AddEditProductCategoryComponent } from './components/add-edit-product-category/add-edit-product-category.component';
import {ProductCategoryRoutingModule} from "./product-category-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EnableDisableProductCategoryComponent } from './components/enable-disable-product-category/enable-disable-product-category.component';
import { DeleteProductCategoryComponent } from './components/delete-product-category/delete-product-category.component';
import {ColorPickerModule} from "ngx-color-picker";
import { SelectMultipleProductCategoriesComponent } from './components/select-multiple-product-categories/select-multiple-product-categories.component';
import { ShowProductCategoriesComponent } from './components/show-product-categories/show-product-categories.component';
import { ShowProductCategoriesInCardComponent } from './components/show-product-categories-in-card/show-product-categories-in-card.component';



@NgModule({
  declarations: [ProductCategoryDashboardComponent, ProductCategoryListComponent, AddEditProductCategoryComponent, EnableDisableProductCategoryComponent, DeleteProductCategoryComponent, SelectMultipleProductCategoriesComponent, ShowProductCategoriesComponent, ShowProductCategoriesInCardComponent],
  exports: [
    SelectMultipleProductCategoriesComponent,
    ShowProductCategoriesComponent,
    ShowProductCategoriesInCardComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    FontAwesomeModule,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule,
  ]
})
export class ProductCategoryModule { }
