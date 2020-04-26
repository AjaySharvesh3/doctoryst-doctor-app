import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDashboardComponent } from './components/ticket-dashboard/ticket-dashboard.component';
import {TicketRoutingModule} from "./ticket-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [TicketListComponent, TicketDashboardComponent],
  imports: [
    TicketRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class TicketsModule { }
