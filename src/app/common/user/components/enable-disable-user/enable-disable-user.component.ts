import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {AppConstant} from '../../../core/constants';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase/app';
import {faExclamationTriangle, faUserCheck, faUserTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enable-disable-user',
  templateUrl: './enable-disable-user.component.html',
  styleUrls: ['./enable-disable-user.component.css']
})
export class EnableDisableUserComponent implements OnInit {
  formSubmitted = false;
  isDisableUser: boolean;
  isEnableUser: boolean;

  faUserTimes: any = faUserTimes;
  faUserCheck: any = faUserCheck;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedUser: UserModel;
  @Output() afterUserEnabledOrDisabled = new EventEmitter();

  confirmEnableDisableUserModal: BsModalRef;
  @ViewChild('enableDisableUserTemplate', {static: true}) enableDisableUserModalTemplate;

  constructor(
    private modalService: BsModalService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedUser) {
      this.isEnableUser = this.selectedUser.status === AppConstant.STATUS.DISABLED;
      this.isDisableUser = this.selectedUser.status === AppConstant.STATUS.ENABLED;
    }
  }

  openEnableDisableUser() {
    this.confirmEnableDisableUserModal = this.modalService.show(this.enableDisableUserModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDisableUser() {
    this.formSubmitted = true;

    if (!this.selectedUser) {
      return;
    }

    const user = {
      id: this.selectedUser.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DISABLED
    };

    this.userService
      .updateUser(user)
      .then(response => {
          this.closeEnableDisableUser();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEnableUser() {
    this.formSubmitted = true;

    if (!this.selectedUser) {
      return;
    }

    const user = {
      id: this.selectedUser.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.ENABLED
    };

    this.userService
      .updateUser(user)
      .then(response => {
          this.closeEnableDisableUser();
        },
        error => {
          console.log('error', error);
        });
  }

  closeEnableDisableUser() {
    this.confirmEnableDisableUserModal.hide();
    this.formSubmitted = false;
    this.emitAfterUserEnabledOrDisabled();
  }

  emitAfterUserEnabledOrDisabled() {
    this.afterUserEnabledOrDisabled.emit();
  }

}
