import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, EmailVerifiedGuard} from './common/core/guards';
import {AppConstant} from './common/core/constants';
import {UserModule} from './common/user/user.module';
import {SecurityModule} from './common/security/security.module';
import {PatientsModule} from './patients/patients.module';
import {LayoutModule} from './common/layout/layout.module';
import {OperationUserGuard} from './common/core/guards/operation-user.guard';
import {PageNotFoundComponent} from './common/layout/components/page-not-found/page-not-found.component';

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
    path: 'patients',
    loadChildren: () => PatientsModule,
    canActivate: [AuthGuard, EmailVerifiedGuard, OperationUserGuard],
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard, EmailVerifiedGuard]
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
