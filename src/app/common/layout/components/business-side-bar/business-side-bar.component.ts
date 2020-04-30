import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import {UserModel} from "../../../user/models/user.model";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../../core/services";
import {SessionStorageService} from "../../../core/services/session-storage.service";
import {UserService} from "../../../user/services/user.service";
import {ConnectionService} from "ng-connection-service";
import {AppConstant} from "../../../core/constants";
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-business-side-bar',
  templateUrl: './business-side-bar.component.html',
  styleUrls: ['./business-side-bar.component.css']
})
export class BusinessSideBarComponent implements OnInit {
  isOverviewCollapsed = false;
  isProductCollapsed = false;
  isOrderCollapsed = false;
  isProfileCollapsed = false;

  currentMenu = '';
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  loggedInUser: string;
  user: UserModel;
  isOnline = true;
  userRoles: [];
  userRole: string;
  userDetails = {};

  faUserCircle: any = faUserCircle;
  faSignOutAlt: any = faSignOutAlt;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private userService: UserService,
    private connectionService: ConnectionService) {
    this.connectionService.monitor()
      .subscribe(isConnected => {
        this.isOnline = isConnected;
      });
  }

  static extractCurrentPath(pathName) {
    let currentRootPath = '';
    const pathNamesList = _.split(pathName, '/');

    if (pathNamesList && pathNamesList[1]) {
      currentRootPath = pathNamesList[1];
    }

    return currentRootPath;
  }

  ngOnInit() {
    this.checkUserLogin();
    this.detectRouteChanges();
  }

  ngOnChanges() {
    this.getUserCurrentRole();
  }

  detectRouteChanges() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (location.pathname !== '') {
          this.currentMenu = BusinessSideBarComponent.extractCurrentPath(location.pathname);
        } else {
          this.currentMenu = AppConstant.NAVIGATE_TO.login;
        }
      }
    });
  }

  checkUserLogin() {
    this.authService.getAuth()
      .subscribe(userDocument => {
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

  getUserCurrentRole() {
    this.userRoles = this.userService.getUserRoleFromSessionStorage();
    _.forEach(this.user.roles, (role, index) => {
      if (this.user.roles[index] == true)
        this.userRole = index;
      return;
    })
  }

  logOut() {
    // this.authService.logout();
    // this.sessionStorageService.removeKey(AppConstant.LOGGED_IN_USER);
    this.userRole = undefined;
    this.router.navigate([AppConstant.NAVIGATE_TO.logout]);
    this.resetLogin();
  }

  resetLogin() {
    this.isLoggedIn = false;
    this.loggedInUser = undefined;
    this.sessionStorageService.removeKey(AppConstant.LOGGED_IN_USER_ROLES);
  }

  getLoggedInUserDetails(email) {
    this.userService
      .getUserByEmail(email)
      .then(changes => {
        this.user = changes.docs[0].data();

        if (this.user) {

          _.forEach(this.user.roles, (role, index) => {
            if (this.user.roles[index] == true) {
              this.userRole = index;
              this.userDetails = {
                email: this.user.email,
                name: this.user.firstName + ' ' + this.user.lastName,
                role: this.userRole
              };
            }
          })

          this.sessionStorageService.setValue(AppConstant.LOGGED_IN_USER, JSON.stringify(this.userDetails));
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

}
