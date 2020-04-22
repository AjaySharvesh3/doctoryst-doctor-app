import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreRoutingModule} from './store-routing.module';
import {AddEditStoreComponent} from './components/add-edit-store/add-edit-store.component';
import {StoreDashboardComponent} from './components/store-dashboard/store-dashboard.component';
import {EnableDisableStoreComponent} from './components/enable-disable-store/enable-disable-store.component';
import {StoreListComponent} from './components/store-list/store-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DeleteStoreComponent } from './components/delete-store/delete-store.component';
import {StoreProfileModule} from "../profiles/store-profile/store-profile.module";
import {ProductCategoryModule} from "../product-category/product-category.module";

@NgModule({
  declarations: [
    AddEditStoreComponent,
    StoreDashboardComponent,
    EnableDisableStoreComponent,
    StoreListComponent,
    DeleteStoreComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    StoreProfileModule,
    FontAwesomeModule,
    FormsModule,
    ProductCategoryModule
  ]
})
export class StoreModule {
}
