import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, EmailVerifiedGuard} from './common/core/guards';
import {AppConstant} from './common/core/constants';
import {UserModule} from './common/user/user.module';
import {SecurityModule} from './common/security/security.module';
import {StoreModule} from './stores/store.module';
import {OperationUserGuard} from "./common/core/guards/operation-user.guard";
import {SupportUserGuard} from "./common/core/guards/support-user.guard";
import {TicketsModule} from "./tickets/tickets.module";

const routes: Routes = [
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
    canActivate: [AuthGuard, EmailVerifiedGuard, OperationUserGuard]
  },
  {
    path: 'tickets',
    loadChildren: () => TicketsModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, SupportUserGuard]
  },
  {
    path: '**',
    redirectTo: AppConstant.NAVIGATE_TO.login,
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
