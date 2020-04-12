import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {AddEditProjectComponent} from './components/add-edit-project/add-edit-project.component';
import {ProjectDashboardComponent} from './components/project-dashboard/project-dashboard.component';
import {EnableDisableProjectComponent} from './components/enable-disable-project/enable-disable-project.component';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AddEditProjectComponent,
    ProjectDashboardComponent,
    EnableDisableProjectComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    FontAwesomeModule
  ]
})
export class ProjectModule {
}
