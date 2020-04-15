import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {ErrorComponent} from './components/error/error.component';
import {NotAuthorizedComponent} from './components/not-authorized/not-authorized.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PendingEmailVerificationComponent} from './components/pending-email-verification/pending-email-verification.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {SecurityCheckComponent} from './components/security-check/security-check.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {AppConstant} from "../core/constants";
import {PageNotFoundComponent} from "../layout/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: SecurityCheckComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: 'pending-email-verification',
    component: PendingEmailVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
