import {Component, OnInit} from '@angular/core';
import {AppConstant} from '../../../core/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../core/services';
import {faExclamationTriangle, faThumbsUp, faUnlockAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-security-check',
  templateUrl: './security-check.component.html',
  styleUrls: ['./security-check.component.css']
})
export class SecurityCheckComponent implements OnInit {
  oobCode = '';
  mode = '';
  errorMessage = '';
  showVerifyEmailErrorMessage = false;
  showVerifyEmailSuccessMessage = false;
  showResetPassword: boolean;
  resetPasswordForm: FormGroup;
  userEmail = '';
  showPasswordMismatchMessage = false;
  showPasswordResetErrorMessage = false;
  showPasswordResetSuccessMessage = false;
  formSubmitted = false;

  faThumbsUp: any = faThumbsUp;
  faUnlockAlt: any = faUnlockAlt;
  faExclamationTriangle: any = faExclamationTriangle;

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService,
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
    } else if (this.mode === AppConstant.USER_ACCOUNT_ACTION_VERIFY_EMAIL) {
      this.validateVerifyEmailCode();
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

  validateVerifyEmailCode() {
    this.authService.verifyEmailAction(this.oobCode)
      .then(response => {
        this.showVerifyEmailSuccessMessage = true;
      })
      .catch(error => {
        this.showVerifyEmailErrorMessage = true;
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

  goToForgotPassword() {
    this.router.navigate([AppConstant.NAVIGATE_TO.forgotPassword]);
  }

  goToLogin() {
    this.router.navigate([AppConstant.NAVIGATE_TO.login]);
  }

  goToHome() {
    this.router.navigate([AppConstant.NAVIGATE_TO.home]);
  }

  goToVerifyEmail() {
    this.router.navigate([AppConstant.NAVIGATE_TO.pendingEmailVerification + this.prepareQueryParameters()]);
  }

  goToResetPassword() {
    this.router.navigate([AppConstant.NAVIGATE_TO.resetPassword + this.prepareQueryParameters()]);
  }

  prepareQueryParameters() {
    return '?mode=' + this.mode + '&oobCode=' + this.oobCode;
  }

}
