import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemCategoryDashboardComponent} from "./components/item-category-dashboard/item-category-dashboard.component";

const routes: Routes = [
  {
    path: '', component: ItemCategoryDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCategoryRoutingModule {
}
