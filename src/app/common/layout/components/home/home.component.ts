import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../user/models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../core/services';
import {UserService} from '../../../user/services/user.service';
import {SessionStorageService} from '../../../core/services/session-storage.service';
import {AppConstant} from '../../../core/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UserModel;
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  loggedInUser: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkUserLogin();
  }

  checkUserLogin() {
    this.authService.getAuth()
      .subscribe((userDocument) => {
        if (userDocument) {
          this.isLoggedIn = true;
          this.isEmailVerified = userDocument.emailVerified;
          this.loggedInUser = userDocument.displayName ? userDocument.displayName : userDocument.email;

          this.getLoggedInUserDetails(userDocument.email);
        } else {
          this.isLoggedIn = false;
        }
      });
  }

  getLoggedInUserDetails(email) {
    this.userService
      .getUserByEmail(email)
      .then((changes) => {
        this.user = changes.docs[0].data();

        if (this.user) {
          const userDetails = {
            operation: this.user.roles.operation,
            support: this.user.roles.support,
            business: this.user.roles.business
          };

          this.sessionStorageService.setValue(AppConstant.LOGGED_IN_USER_ROLES, JSON.stringify(userDetails));

          if (userDetails.operation) {
            this.goToStores();
          } else {
            this.goToPageNotFound();
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  goToStores() {
    this.router.navigate([AppConstant.NAVIGATE_TO.patients]);
  }

  goToPageNotFound() {
    this.router.navigate([AppConstant.NAVIGATE_TO.pageNotFound]);
  }

}
