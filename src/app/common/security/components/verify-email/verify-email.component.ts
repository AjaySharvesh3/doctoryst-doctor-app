import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConstant} from '../../../core/constants';
import {faExclamationTriangle, faThumbsUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  errorMessage = '';
  oobCode = '';
  mode = '';
  showVerifyEmailErrorMessage = false;
  showVerifyEmailSuccessMessage = false;

  faThumbsUp: any = faThumbsUp;
  faExclamationTriangle: any = faExclamationTriangle;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.extractParametersFromURL();
  }

  extractParametersFromURL() {
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    this.mode = this.route.snapshot.queryParamMap.get('mode');

    if (this.mode === AppConstant.USER_ACCOUNT_ACTION_VERIFY_EMAIL) {
      this.validateVerifyEmailCode();
    } else {
      this.goToLogin();
    }
  }

  validateVerifyEmailCode() {
    this.authService.verifyEmailAction(this.oobCode)
      .then(response => {
        this.showVerifyEmailSuccessMessage = true;
      })
      .catch(error => {
        this.showVerifyEmailErrorMessage = true;
        this.errorMessage = error.message;
        console.log('validateVerifyEmailCode() | Error: ', error);
      });
  }

  goToLogin() {
    this.router.navigate([AppConstant.NAVIGATE_TO.login]);
  }

  goToHome() {
    this.router.navigate([AppConstant.NAVIGATE_TO.home]);
  }

  goToPendingEmailVerification() {
    this.router.navigate([AppConstant.NAVIGATE_TO.pendingEmailVerification]);
  }

}
