import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecurityRoutingModule} from './security-routing.module';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {ErrorComponent} from './components/error/error.component';
import {NotAuthorizedComponent} from './components/not-authorized/not-authorized.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PendingEmailVerificationComponent} from './components/pending-email-verification/pending-email-verification.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {SecurityCheckComponent} from './components/security-check/security-check.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    LogoutComponent,
    ErrorComponent,
    NotAuthorizedComponent,
    PendingEmailVerificationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SecurityCheckComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SecurityModule {
}
