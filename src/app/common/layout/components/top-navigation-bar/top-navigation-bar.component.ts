import {Component, OnInit} from '@angular/core';
import {AppConstant} from '../../../core/constants';
import {NavigationEnd, Router} from '@angular/router';
import _ from 'lodash';
import {AuthService} from '../../../core/services';
import {UserModel} from '../../../user/models/user.model';
import {UserService} from '../../../user/services/user.service';
import {faCircle, faGlobe, faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {SessionStorageService} from '../../../core/services/session-storage.service';
import {version} from '../../../../../../package.json';
import {ConnectionService} from 'ng-connection-service';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.css']
})
export class TopNavigationBarComponent implements OnInit {
  topMenuList = AppConstant.TOP_MENU_LIST;
  currentMenu = '';
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  loggedInUser: string;
  user: UserModel;
  appVersion: string = version;
  isOnline = true;

  faUserCircle: any = faUserCircle;
  faSignOutAlt: any = faSignOutAlt;
  faGlobe: any = faGlobe;
  faCircle: any = faCircle;

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

  detectRouteChanges() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (location.pathname !== '') {
          this.currentMenu = TopNavigationBarComponent.extractCurrentPath(location.pathname);
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

  logOut() {
    /*this.authService.logout();
    this.sessionStorageService.removeKey(AppConstant.LOGGED_IN_USER);*/
    this.router.navigate([AppConstant.NAVIGATE_TO.logout]);
    this.resetLogin();
  }

  resetLogin() {
    this.isLoggedIn = false;
    this.loggedInUser = undefined;
  }

  getLoggedInUserDetails(email) {
    this.userService
      .getUserByEmail(email)
      .then(changes => {
        this.user = changes.docs[0].data();

        if (this.user) {
          const userDetails = {
            email: this.user.email,
            name: this.user.firstName + ' ' + this.user.lastName
          };

          this.sessionStorageService.setValue(AppConstant.LOGGED_IN_USER, JSON.stringify(userDetails));
          this.processMenuList();
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  processMenuList() {
    _.forEach(this.topMenuList, menu => {
      this.setMenuVisibility(menu);
    });
  }

  setMenuVisibility(menu) {
    let menuVisible = false;

    if (_.isEmpty(menu.allowedRoles)) {
      menuVisible = true;
    } else {
      _.forEach(menu.allowedRoles, allowedRole => {
        if (!menuVisible) {
          menuVisible = this.user.roles[allowedRole];
        }
      });
    }

    menu.visible = menuVisible;
  }

}
