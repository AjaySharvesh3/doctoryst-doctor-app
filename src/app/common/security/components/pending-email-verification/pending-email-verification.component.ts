import {Component, OnInit} from '@angular/core';
import {AppConstant} from '../../../core/constants';
import {AuthService} from '../../../core/services';
import {Router} from '@angular/router';
import {UserModel} from '../../../user/models/user.model';
import {UserService} from '../../../user/services/user.service';
import {SessionStorageService} from '../../../core/services/session-storage.service';
import {environment} from '../../../../../environments/environment';
import _ from 'lodash';
import * as firebase from 'firebase/app';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pending-email-verification',
  templateUrl: './pending-email-verification.component.html',
  styleUrls: ['./pending-email-verification.component.css']
})
export class PendingEmailVerificationComponent implements OnInit {
  showPendingVerificationMessage = false;
  userAccountExist = false;
  errorMessage = '';
  formSubmitted = false;
  user: UserModel;
  newAdminUser: UserModel;

  faExclamationTriangle: any = faExclamationTriangle;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.checkAuthenticatedUser();
  }

  checkAuthenticatedUser() {
    this.authService.getAuth()
      .subscribe(user => {
        if (user) {
          this.handleNextStepsForValidUser(user);
        } else {
          this.handleNextStepsForInvalidUser();
        }
      });
  }

  handleNextStepsForValidUser(user) {
    if (user.emailVerified) {
      this.showPendingVerificationMessage = false;
      this.router.navigate([AppConstant.NAVIGATE_TO.home]);
    } else {
      if (this.isUserRegistrationInProgress()) {
        this.checkUserAccount();
      } else {
        this.showPendingVerificationMessage = true;
      }
    }
  }

  handleNextStepsForInvalidUser() {
    if (this.isUnauthorizedUserDetailsInSession()) {
      this.router.navigate([AppConstant.NAVIGATE_TO.accessNotAuthorized]);
    } else {
      this.router.navigate([AppConstant.NAVIGATE_TO.login]);
    }
  }

  checkUserAccount() {
    const currentUser = this.authService.getCurrentUser();

    this.userService
      .getUserByEmail(currentUser.email)
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
            this.updateUserProfileDisplayName(this.user);

          } else if (this.isAdminUserRegistrationInProgress(currentUser)) {
            this.addNewAdminUser();
          } else {
            this.userAccountExist = false;
            this.deleteNewlyRegisteredUserWhenNoAccessProvided();
          }
        },
        error => {
          console.log('error', error);
        }
      );
  }

  updateUserProfileDisplayName(user) {
    this.authService.updateUserDisplayName(user.firstName + ' ' + user.lastName)
      .then(response => {
        this.sendEmailConfirmationEmailAfterSignUp();
      })
      .catch(error => {
        this.sendEmailConfirmationEmailAfterSignUp();
      });
  }

  sendEmailConfirmationEmailAfterSignUp() {
    const currentUser = this.authService.getCurrentUser();

    currentUser.sendEmailVerification()
      .then(response => {
          this.removeUserRegistrationInProgressFromSession();
          this.removeUnauthorizedUserDetailsFromSession();
          this.showPendingVerificationMessage = true;
        },
        error => {
          console.log('error', error);
        });
  }

  deleteNewlyRegisteredUserWhenNoAccessProvided() {
    this.authService
      .deleteCurrentUser()
      .then(result => {
        this.setUnauthorizedUserDetailsInSession();
        this.removeUserRegistrationInProgressFromSession();
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log('error', error);
      });
  }

  isUnauthorizedUserDetailsInSession() {
    return this.sessionStorageService.getValue(AppConstant.UNAUTHORIZED_ACCESS);
  }

  setUnauthorizedUserDetailsInSession() {
    this.sessionStorageService.setValue(AppConstant.UNAUTHORIZED_ACCESS, true);
  }

  isUserRegistrationInProgress() {
    return this.sessionStorageService.getValue(AppConstant.USER_REGISTRATION_IN_PROGRESS);
  }

  removeUnauthorizedUserDetailsFromSession() {
    this.sessionStorageService.removeKey(AppConstant.UNAUTHORIZED_ACCESS);
  }

  removeUserRegistrationInProgressFromSession() {
    this.sessionStorageService.removeKey(AppConstant.USER_REGISTRATION_IN_PROGRESS);
  }

  isAdminUserRegistrationInProgress(currentUser) {
    const defaultAdminUsersByEmailMap = _.keyBy(environment.defaultAdminUsers, 'email');
    let adminUserRegistrationInProgress = false;

    if (defaultAdminUsersByEmailMap.hasOwnProperty(currentUser.email)) {
      this.newAdminUser = defaultAdminUsersByEmailMap[currentUser.email];
      adminUserRegistrationInProgress = true;
    }

    return adminUserRegistrationInProgress;
  }

  addNewAdminUser() {
    this.newAdminUser.roles = {
      admin: true,
      endUser: false,
    };

    this.newAdminUser.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    this.newAdminUser.updatedAt = this.newAdminUser.createdAt;
    this.newAdminUser.status = AppConstant.STATUS.ENABLED;

    this.userService
      .addUser(this.newAdminUser)
      .then(response => {
          this.updateUserProfileDisplayName(this.newAdminUser);
        },
        error => {
          console.log('error', error);
        });

  }

}
