import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services';
import {Router} from '@angular/router';
import {AppConstant} from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../user/services/user.service';
import {SessionStorageService} from '../../../core/services/session-storage.service';
import {faExclamationTriangle, faPenAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  showSignUp: boolean;
  signUpForm: FormGroup;
  errorMessage = '';
  showPasswordMismatchMessage = false;
  formSubmitted = false;
  showPassword = true;

  faExclamationTriangle: any = faExclamationTriangle;
  faPenAlt: any = faPenAlt;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  ngOnInit() {
    this.checkAuthenticatedUser();
  }

  checkAuthenticatedUser() {
    this.authService.getAuth()
      .subscribe(user => {
        if (user) {
          this.showSignUp = false;
          this.router.navigate([AppConstant.NAVIGATE_TO.home]);
        } else {
          this.showSignUp = true;
          this.initSignUpForm();
        }
      });
  }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.pattern(AppConstant.REGEX.emailRegex)],
        updateOn: 'blur'
      }],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp() {
    this.formSubmitted = true;

    if (!this.signUpForm.valid) {
      return;
    }

    this.setUserRegistrationInProgressInSession();
    const email = this.signUpForm.value.email.toLowerCase();

    this.authService
      .signUpWithEmailAndPassword(email, this.signUpForm.value.password)
      .then(result => {
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

  setUserRegistrationInProgressInSession() {
    this.sessionStorageService.setValue(AppConstant.USER_REGISTRATION_IN_PROGRESS, true);
  }

  checkEnteredPasswords() {
    this.showPasswordMismatchMessage = this.password.value && this.confirmPassword.value && (this.password.value !== this.confirmPassword.value);
  }

  goToLogin() {
    this.router.navigate([AppConstant.NAVIGATE_TO.login]);
  }

}
