import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreRoutingModule} from './store-routing.module';
import {AddEditStoreComponent} from './components/add-edit-store/add-edit-store.component';
import {StoreDashboardComponent} from './components/store-dashboard/store-dashboard.component';
import {EnableDisableStoreComponent} from './components/enable-disable-store/enable-disable-store.component';
import {StoreListComponent} from './components/store-list/store-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AddEditStoreComponent,
    StoreDashboardComponent,
    EnableDisableStoreComponent,
    StoreListComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    FontAwesomeModule
  ]
})
export class StoreModule {
}
