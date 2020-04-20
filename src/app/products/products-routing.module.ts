import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsDashboardComponent} from "./product-dashboard/components/products-dashboard/products-dashboard.component";
import { ProductPlantsComponent } from './product-dashboard/components/product-plants/product-plants.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsDashboardComponent
  },
  {
    path: 'plants',
    component: ProductPlantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
