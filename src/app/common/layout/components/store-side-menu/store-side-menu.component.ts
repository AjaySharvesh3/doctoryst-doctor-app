import { Component, OnInit } from '@angular/core';
import {AppConstant} from "../../../core/constants";
import {UserModel} from "../../../user/models/user.model";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../../core/services";
import _ from "lodash";
import {SessionStorageService} from "../../../core/services/session-storage.service";
import {UserService} from "../../../user/services/user.service";
import {ConnectionService} from "ng-connection-service";

@Component({
  selector: 'app-store-side-menu',
  templateUrl: './store-side-menu.component.html',
  styleUrls: ['./store-side-menu.component.css']
})
export class StoreSideMenuComponent implements OnInit {

  storeSideMenuList = AppConstant.STORE_SIDE_MENU_LIST;
  currentMenu = '';
  user: UserModel;

  constructor(
    private router: Router
  ) { }

  static extractCurrentPath(pathName) {
    let currentRootPath = '';
    const pathNamesList = _.split(pathName, '/', 4);

    if (pathNamesList && pathNamesList[3]) {
      currentRootPath = pathNamesList[3];
    }

    return currentRootPath;
  }

  ngOnInit() {
    this.detectRouteChanges();
  }

  detectRouteChanges() {
    this.currentMenu = AppConstant.STORE_SIDE_MENU_LIST[0].path;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (location.pathname !== '') {
          this.currentMenu = StoreSideMenuComponent.extractCurrentPath(location.pathname);
        } else {
          this.currentMenu = AppConstant.NAVIGATE_TO.login;
        }
      }
    });
  }

}
