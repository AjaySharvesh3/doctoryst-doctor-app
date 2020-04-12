import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConstant} from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../user/services/user.service';
import {SessionStorageService} from '../../../core/services/session-storage.service';
import {faExclamationTriangle, faThumbsUp, faUnlockAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  showResetPassword: boolean;
  resetPasswordForm: FormGroup;
  errorMessage = '';
  oobCode = '';
  mode = '';
  userEmail = '';
  showPasswordMismatchMessage = false;
  showPasswordResetErrorMessage = false;
  showPasswordResetSuccessMessage = false;
  formSubmitted = false;

  faThumbsUp: any = faThumbsUp;
  faUnlockAlt: any = faUnlockAlt;
  faExclamationTriangle: any = faExclamationTriangle;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  ngOnInit() {
    this.extractParametersFromURL();
  }

  extractParametersFromURL() {
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    this.mode = this.route.snapshot.queryParamMap.get('mode');

    if (this.mode === AppConstant.USER_ACCOUNT_ACTION_PASSWORD_RESET) {
      this.validatePasswordResetCode();
    } else {
      this.goToLogin();
    }
  }

  validatePasswordResetCode() {
    this.authService.verifyPasswordResetAction(this.oobCode)
      .then(email => {
        if (email) {
          this.userEmail = email;
          this.showResetPassword = true;
          this.initResetPasswordForm();
        } else {
          this.goToLogin();
        }
      })
      .catch(error => {
        this.showPasswordResetErrorMessage = true;
        this.errorMessage = error.message;
      });
  }

  initResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: [this.userEmail, {
        validators: [Validators.required, Validators.pattern(AppConstant.REGEX.emailRegex)],
        updateOn: 'blur'
      }],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  resetPassword() {
    this.formSubmitted = true;

    if (!this.resetPasswordForm.valid) {
      return;
    }

    this.authService
      .confirmPasswordReset(this.oobCode, this.resetPasswordForm.value.password)
      .then(result => {
        this.showResetPassword = false;
        this.showPasswordResetSuccessMessage = true;
      })
      .catch(error => {
        this.showPasswordResetErrorMessage = true;
        this.errorMessage = error.message;
      });
  }

  checkEnteredPasswords() {
    this.showPasswordMismatchMessage = this.password.value && this.confirmPassword.value && (this.password.value !== this.confirmPassword.value);
  }

  goToLogin() {
    this.router.navigate([AppConstant.NAVIGATE_TO.login]);
  }

  goToForgotPassword() {
    this.router.navigate([AppConstant.NAVIGATE_TO.forgotPassword]);
  }

}
