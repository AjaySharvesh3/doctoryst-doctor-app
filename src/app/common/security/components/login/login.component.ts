import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services';
import {Router} from '@angular/router';
import {AppConstant} from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../user/models/user.model';
import {UserService} from '../../../user/services/user.service';
import {faExclamationTriangle, faLock, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {SessionStorageService} from '../../../core/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogin: boolean;
  loginForm: FormGroup;
  errorMessage = '';
  formSubmitted = false;
  isEmailEmpty = false;
  isPasswordEmpty = false;
  user: UserModel;

  faLock: any = faLock;
  faSignInAlt: any = faSignInAlt;
  faExclamationTriangle: any = faExclamationTriangle;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.checkAuthenticatedUser();
  }

  checkAuthenticatedUser() {
    this.authService.getAuth()
      .subscribe(user => {
        if (user) {
          if (!user.displayName) {
            this.getUserDetailAndUpdateProfileDisplayName(user.email);
          }

          if (user.emailVerified) {
            this.showLogin = false;
            this.router.navigate([AppConstant.NAVIGATE_TO.home]);
          } else {
            this.router.navigate([AppConstant.NAVIGATE_TO.pendingEmailVerification]);
          }

        } else {
          this.showLogin = true;
          this.initLoginForm();
        }
      });
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', {validators: [Validators.required]}],
      password: ['', Validators.required]
    });
  }

  login() {
    this.formSubmitted = true;
    const user = this.loginForm.value;

    if (!user.email || !user.password) {
      this.isEmailEmpty = !user.email;
      this.isPasswordEmpty = !user.password;
      return;
    }

    user.email = user.email.toLowerCase();

    this.authService.login(user.email, user.password)
      .then(result => {
        // @ts-ignore
        if (result.user.emailVerified) {
          // @ts-ignore
          console.log(result.user);
          this.router.navigate([AppConstant.NAVIGATE_TO.home]);
        } else {
          this.router.navigate([AppConstant.NAVIGATE_TO.pendingEmailVerification]);
        }
      })
      .catch(error => {
        this.errorMessage = AppConstant.MESSAGE.loginErrorMessage;
      });
  }

  getUserDetailAndUpdateProfileDisplayName(email) {
    this.userService
      .getUserByEmail(email)
      .then(changes => {
        const usersResult = [];

        if (changes.size > 0) {
          changes.forEach(user => {
            if (user.exists) {
              const data = user.data() as UserModel;
              data.id = user.id;
              usersResult.push(data);
            }
          });

          this.user = usersResult[0];
          this.updateUserProfileDisplayName();
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  updateUserProfileDisplayName() {
    this.authService.updateUserDisplayName(this.user.firstName + ' ' + this.user.lastName)
      .then(response => {
      })
      .catch(error => {
      });
  }

  goToSignUp() {
    this.router.navigate([AppConstant.NAVIGATE_TO.signUp]);
  }

  goToForgotPassword() {
    this.router.navigate([AppConstant.NAVIGATE_TO.forgotPassword]);
  }

}
