import {Component, OnInit} from '@angular/core';
import _ from 'lodash';
import {UserService} from "./common/user/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ShrubsInk';
  /*userRoles: [];
  userRole: string;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.currentUserRole();
  }

  currentUserRole() {
    this.userRoles = this.userService.getUserRoleFromSessionStorage();
    _.forEach(this.userRoles, (role, index) => {
      if (this.userRoles[index] == true) {
        this.userRole = index;
        return;
      }
    });
  }*/
}
