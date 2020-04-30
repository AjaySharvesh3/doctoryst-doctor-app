import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessDashboardComponent} from "./components/business-dashboard/business-dashboard.component";
import {StoreProfileDashboardComponent} from "../../operation/profiles/store-profile/components/store-profile-dashboard/store-profile-dashboard.component";
import {BusinessStatsComponent} from "./components/business-stats/business-stats.component";

const routes: Routes = [
  {
    path: '', component: BusinessDashboardComponent
  },
  {
    path: 'business-dashboard', component: BusinessDashboardComponent
  },
  {
    path: 'business-stats',
    component: BusinessStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessOverviewRoutingModule {
}
