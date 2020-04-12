import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {AddEditUserComponent} from './components/add-edit-user/add-edit-user.component';
import {UserDashboardComponent} from './components/user-dashboard/user-dashboard.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EnableDisableUserComponent} from './components/enable-disable-user/enable-disable-user.component';


@NgModule({
  declarations: [
    AddEditUserComponent,
    UserDashboardComponent,
    UserListComponent,
    EnableDisableUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    FontAwesomeModule
  ]
})
export class UserModule {
}
