import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConstant} from '../../../core/constants';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {faUserEdit, faUserPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  addEditUserForm: FormGroup;
  errorMessage = '';
  selectedUser: UserModel;
  formSubmitted = false;
  allRoles = AppConstant.ROLES;

  faUserEdit: any = faUserEdit;
  faUserPlus: any = faUserPlus;

  @Input() isAddUser: boolean;
  @Input() isEditUser: boolean;
  @Input() selectedUserId: string;
  @Output() afterUserAddedOrEdited = new EventEmitter();

  confirmAddEditUserModal: BsModalRef;
  @ViewChild('addEditUserTemplate', {static: true}) addEditUserModalTemplate;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder) {
  }

  get firstName() {
    return this.addEditUserForm.get('firstName');
  }

  get lastName() {
    return this.addEditUserForm.get('lastName');
  }

  get email() {
    return this.addEditUserForm.get('email');
  }

  get roles() {
    return this.addEditUserForm.get('roles') as FormGroup;
  }

  ngOnInit() {
    this.initAddEditUserForm();
  }

  initAddEditUserForm() {
    this.addEditUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', {
        validators: [Validators.required, Validators.pattern(AppConstant.REGEX.emailRegex)],
        updateOn: 'blur'
      }],
      roles: this.formBuilder.group({
        operation: false,
        support: false,
        business: false
      })
    });
  }

  openAddEditUser() {
    this.confirmAddEditUserModal = this.modalService.show(this.addEditUserModalTemplate,
      {
        backdrop: 'static'
      });

    if (this.isEditUser) {
      this.getUserById();
    }
  }

  getUserById() {
    if (!this.selectedUserId) {
      return;
    }

    this.userService
      .getUserById(this.selectedUserId)
      .then(documentSnapshot => {
        this.selectedUser = documentSnapshot.data() as UserModel;
        this.populateUserFormWithExistingUser(this.selectedUser);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  populateUserFormWithExistingUser(existingUser) {
    this.firstName.setValue(existingUser.firstName);
    this.lastName.setValue(existingUser.lastName);
    this.email.setValue(existingUser.email);

    if (existingUser.roles) {
      this.roles.setValue(existingUser.roles);
    }

  }

  confirmAddUser() {
    this.formSubmitted = true;

    if (!this.addEditUserForm.valid) {
      this.formSubmitted = false;
      return;
    }

    const user = this.addEditUserForm.value;
    user.status = AppConstant.STATUS.ENABLED;
    user.email = user.email.toLowerCase();

    this.userService
      .addUser(user)
      .then(response => {
          this.closeAddEditUser();
        },
        error => {
          this.closeAddEditUser();
          console.log('error', error);
        });
  }

  confirmEditUser() {
    this.formSubmitted = true;

    if (!this.addEditUserForm.valid) {
      this.formSubmitted = false;
      return;
    }

    const user = this.addEditUserForm.value;
    user.id = this.selectedUserId;
    user.status = this.selectedUser.status;
    user.email = user.email.toLowerCase();

    this.userService
      .updateUser(user)
      .then(response => {
          this.closeAddEditUser();
        },
        error => {
          this.closeAddEditUser();
          console.log('error', error);
        });

  }

  closeAddEditUser() {
    this.confirmAddEditUserModal.hide();
    this.formSubmitted = false;
    this.initAddEditUserForm();
    this.emitAfterUserAddedOrEdited();
  }

  emitAfterUserAddedOrEdited() {
    this.afterUserAddedOrEdited.emit();
  }

}
