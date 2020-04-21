import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCategoryDashboardComponent} from "./components/product-category-dashboard/product-category-dashboard.component";

const routes: Routes = [
  {
    path: '', component: ProductCategoryDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule {
}
