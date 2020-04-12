import {Component, OnInit} from '@angular/core';
import {AppConstant} from '../../../core/constants';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  allRoles = AppConstant.ROLES;
  selectedRole = 'all';
  faUsers: any = faUsers;
  refreshUserList = false;

  constructor() {
  }

  ngOnInit() {
  }

  setSelectedRole(roleBrand) {
    this.selectedRole = roleBrand;
  }

  triggerUserRefresh() {
    this.refreshUserList = true;
  }

}
