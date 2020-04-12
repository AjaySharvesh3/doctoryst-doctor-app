import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {AppConstant} from '../../../core/constants';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {
  userList: [UserModel];
  dataFetchInProgress: boolean;
  isInitialDataLoad: boolean;
  allRoles = AppConstant.ROLES;

  faExclamationTriangle: any = faExclamationTriangle;

  @Input() filterByRole = 'all';
  @Input() refreshUserList = false;

  constructor(
    private userService: UserService) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getUserList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterByRole && changes.filterByRole.currentValue) {
      if (this.filterByRole === 'all') {
        this.getUserList();
      } else {
        this.searchUserList();
      }
    }

    if (changes.refreshUserList && !changes.refreshUserList.firstChange && changes.refreshUserList.currentValue) {
      this.getUserList();
    }
  }

  searchUserList() {
    const searchCriteria = {
      field: 'roles.' + this.filterByRole,
      operation: '==',
      value: true,
    };

    this.userService
      .searchUserList(searchCriteria)
      .then(changes => {
          const usersResult = [];

          changes.forEach(user => {
            if (user.exists === false) {
              return null;
            } else {
              const data = user.data();
              data.id = user.id;
              usersResult.push(data);
            }
          });

          this.userList = usersResult as [UserModel];
        },
        error => {
          console.log('error', error);
        });
  }

  getUserList() {
    this.startDataFetch();

    this.userService
      .getUserList()
      .then(userDocuments => {
        const users = [];

        userDocuments.forEach(userDocument => {
          const user = userDocument.data();
          user.id = userDocument.id;
          users.push(user);
        });

        this.userList = users as [UserModel];
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
        this.endDataFetch();
      });
  }

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }

}
