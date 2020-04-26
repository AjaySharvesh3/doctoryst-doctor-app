import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCategoryDashboardComponent} from './components/item-category-dashboard/item-category-dashboard.component';
import {ItemCategoryListComponent} from './components/item-category-list/item-category-list.component';
import {ItemCategoryOptionListComponent} from './components/item-category-option-list/item-category-option-list.component';
import {AddEditItemCategoryComponent} from './components/add-edit-item-category/add-edit-item-category.component';
import {EnableDisableItemCategoryComponent} from './components/enable-disable-item-category/enable-disable-item-category.component';
import {DeleteItemCategoryComponent} from './components/delete-item-category/delete-item-category.component';
import {ItemCategoryRoutingModule} from "./item-category-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductCategoryModule} from "../product-category/product-category.module";


@NgModule({
  declarations: [
    ItemCategoryDashboardComponent,
    ItemCategoryListComponent,
    ItemCategoryOptionListComponent,
    AddEditItemCategoryComponent,
    EnableDisableItemCategoryComponent,
    DeleteItemCategoryComponent
  ],
  imports: [
    CommonModule,
    ItemCategoryRoutingModule,
    FontAwesomeModule,
    TooltipModule,
    ReactiveFormsModule,
    ProductCategoryModule
  ]
})
export class ItemCategoryModule {
}
