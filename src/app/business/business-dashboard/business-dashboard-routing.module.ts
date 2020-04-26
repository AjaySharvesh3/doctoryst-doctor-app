import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessDashboardComponent} from "./components/business-dashboard/business-dashboard.component";

const routes: Routes = [
  {
    path: '', component: BusinessDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessDashboardRoutingModule {
}
