import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreDashboardComponent} from './components/store-dashboard/store-dashboard.component';
import {StoreProfileDashboardComponent} from "../profiles/store-profile/components/store-profile-dashboard/store-profile-dashboard.component";
import {StoreProfileModule} from "../profiles/store-profile/store-profile.module";

const routes: Routes = [
  {
    path: '',
    component: StoreDashboardComponent
  },
  {
    path: ':storeId',
    component: StoreProfileDashboardComponent,
    loadChildren: () => StoreProfileModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
