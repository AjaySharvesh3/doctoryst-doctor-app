import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicketDashboardComponent} from "./components/ticket-dashboard/ticket-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: TicketDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
