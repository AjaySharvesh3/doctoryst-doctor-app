import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreDashboardComponent} from './components/store-dashboard/store-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StoreDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
