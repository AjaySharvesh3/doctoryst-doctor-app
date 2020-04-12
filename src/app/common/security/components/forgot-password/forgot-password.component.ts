import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConstant} from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faExclamationTriangle, faKey, faPaperPlane} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  showForgotPassword: boolean;
  forgotPasswordForm: FormGroup;
  errorMessage = '';
  showForgotPasswordErrorMessage = false;
  showForgotPasswordResetEmailSuccessMessage = false;
  formSubmitted = false;

  faKey: any = faKey;
  faPaperPlane: any = faPaperPlane;
  faExclamationTriangle: any = faExclamationTriangle;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  ngOnInit() {
    this.showForgotPassword = true;
    this.initForgotPasswordForm();
  }

  initForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.pattern(AppConstant.REGEX.emailRegex)],
        updateOn: 'blur'
      }]
    });
  }

  forgotPassword() {
    this.formSubmitted = true;

    if (!this.forgotPasswordForm.valid) {
      return;
    }

    this.authService
      .initiatePasswordResetEmail(this.forgotPasswordForm.value.email)
      .then(result => {
        this.showForgotPassword = false;
        this.showForgotPasswordResetEmailSuccessMessage = true;
      })
      .catch(error => {
        this.showForgotPasswordErrorMessage = true;
        this.errorMessage = error.message;
      });
  }

  goToLogin() {
    this.router.navigate([AppConstant.NAVIGATE_TO.login]);
  }

}
