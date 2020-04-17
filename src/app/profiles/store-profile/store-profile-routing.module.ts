import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreProfileDashboardComponent} from "./components/store-profile-dashboard/store-profile-dashboard.component";
import {StoreProfileContentComponent} from "./components/store-profile-content/store-profile-content.component";
import {VerificationsComponent} from "./components/verifications/verifications.component";

const routes: Routes = [
  {
    path: '',
    component: StoreProfileDashboardComponent
  },
  {
    path: 'profile',
    component: StoreProfileContentComponent
  },
  {
    path: 'verifications',
    component: VerificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreProfileRoutingModule {
}
