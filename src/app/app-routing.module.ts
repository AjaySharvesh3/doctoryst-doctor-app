import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, EmailVerifiedGuard} from './common/core/guards';
import {AppConstant} from './common/core/constants';
import {UserModule} from './common/user/user.module';
import {SecurityModule} from './common/security/security.module';
import {StoreModule} from './operation/stores/store.module';
import {OperationUserGuard} from "./common/core/guards/operation-user.guard";
import {SupportUserGuard} from "./common/core/guards/support-user.guard";
import {TicketsModule} from "./support/tickets/tickets.module";
import {LayoutModule} from "./common/layout/layout.module";
import {PageNotFoundComponent} from "./common/layout/components/page-not-found/page-not-found.component";
import {ProductCategoryModule} from "./operation/product-category/product-category.module";
import {ItemCategoryModule} from "./operation/item-category/item-category.module";
import {HomeComponent} from "./common/layout/components/home/home.component";
import {BusinessDashboardModule} from "./business/business-dashboard/business-dashboard.module";
import {BusinessUserGuard} from "./common/core/guards/business-user.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => LayoutModule,
    canActivate: [AuthGuard, EmailVerifiedGuard]
  },
  {
    path: 'security',
    loadChildren: () => SecurityModule
  },
  {
    path: 'users',
    loadChildren: () => UserModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, OperationUserGuard]
  },
  {
    path: 'stores',
    loadChildren: () => StoreModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, OperationUserGuard],
  },
  {
    path: 'product-category',
    loadChildren: () => ProductCategoryModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, OperationUserGuard],
  },
  {
    path: 'item-category',
    loadChildren: () => ItemCategoryModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, OperationUserGuard],
  },
  {
    path: 'tickets',
    loadChildren: () => TicketsModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, SupportUserGuard]
  },
  {
    path: 'business-dashboard',
    loadChildren: () => BusinessDashboardModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, BusinessUserGuard]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard, EmailVerifiedGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: AppConstant.NAVIGATE_TO.pageNotFound,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, EmailVerifiedGuard]
})
export class AppRoutingModule {
}
