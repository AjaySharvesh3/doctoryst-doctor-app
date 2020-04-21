import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsDashboardComponent} from "./products-dashboard/components/products-dashboard/products-dashboard.component";
import {ProductPlantsDashboardComponent} from "./plants/components/product-plants-dashboard/product-plants-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsDashboardComponent
  },
  {
    path: 'plants',
    component: ProductPlantsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
