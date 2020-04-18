import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreModel} from '../../models/store.model';
import {AppConstant} from '../../../common/core/constants';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {StoreService} from '../../services/store.service';
import * as firebase from 'firebase';
import _ from 'lodash';
import {faPencilAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../common/user/services/user.service";
import {UserModel} from "../../../common/user/models/user.model";

@Component({
  selector: 'app-add-edit-store',
  templateUrl: './add-edit-store.component.html',
  styleUrls: ['./add-edit-store.component.css']
})
export class AddEditStoreComponent implements OnInit {
  addEditStoreForm: FormGroup;
  formSubmitted = false;
  allTypes = AppConstant.TYPES;

  userList: [UserModel];
  user: UserModel;
  selectedBusinessName: string;

  faPencilAlt: any = faPencilAlt;
  faPlus: any = faPlus;

  @Input() isAddStore: boolean;
  @Input() isEditStore: boolean;
  @Input() selectedStoreId: string;
  @Input() selectedStore: StoreModel;
  @Output() afterStoreAddedOrEdited = new EventEmitter();

  confirmAddEditStoreModal: BsModalRef;
  @ViewChild('addEditStoreTemplate', {static: true}) addEditStoreModalTemplate;

  constructor(
    private modalService: BsModalService,
    private storeService: StoreService,
    private userService: UserService,
    private formBuilder: FormBuilder) {
  }

  get name() {
    return this.addEditStoreForm.get('name');
  }

  get description() {
    return this.addEditStoreForm.get('description');
  }

  get contact() {
    return this.addEditStoreForm.get('contact') as FormGroup;
  }

  get addressLine() {
    return this.addEditStoreForm.get('addressLine');
  }

  get city() {
    return this.addEditStoreForm.get('city');
  }

  get state() {
    return this.addEditStoreForm.get('state');
  }

  get types() {
    return this.addEditStoreForm.get('types') as FormGroup;
  }

  get storeHolderId() {
    return this.addEditStoreForm.get('storeHolderId');
  }

  ngOnInit() {
    this.initAddEditStoreForm();
    this.getBusinessUserList();
  }

  initAddEditStoreForm() {
    this.addEditStoreForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      storeHolderId: '',
      storeHolderName: '',
      contact: '',
      addressLine: '',
      city: '',
      state: '',
      types: this.formBuilder.group({
        plantsType: false,
        flowersType: false,
        gardeningType: false,
        toolsType: false
      })
    });
  }

  openAddEditStore() {
    this.confirmAddEditStoreModal = this.modalService.show(this.addEditStoreModalTemplate,
      {
        backdrop: 'static'
      });

    if (this.isEditStore) {
      this.populateStoreFormWithExistingStore(this.selectedStore);
    }
  }

  populateStoreFormWithExistingStore(existingStore) {
    this.name.setValue(existingStore.name);
    this.description.setValue(existingStore.description);
    this.storeHolderId.setValue(existingStore.storeHolderId);
    this.contact.setValue(existingStore.contact);
    this.addressLine.setValue(existingStore.addressLine);
    this.city.setValue(existingStore.city);
    this.state.setValue(existingStore.state);

    if (existingStore.types) {
      this.types.setValue(existingStore.types);
    }
  }

  confirmAddStore() {
    this.formSubmitted = true;

    if (!this.addEditStoreForm.valid) {
      return;
    }

    this.user = _.find(this.userList, {id: this.addEditStoreForm.value.storeHolderId});
    //@ts-ignore
    this.selectedBusinessName = this.user.firstName + " " + this.user.lastName;

    const store = this.addEditStoreForm.value;
    store.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    store.updatedAt = store.createdAt;
    store.status = AppConstant.STATUS.ENABLED;
    store.storeHolderName = this.selectedBusinessName;

    this.storeService
      .addStore(store)
      .then(response => {
          this.closeAddEditStore();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEditStore() {
    this.formSubmitted = true;

    if (!this.addEditStoreForm.valid) {
      return;
    }

    this.user =  _.find(this.userList, {id: this.addEditStoreForm.value.storeHolderId});
    //@ts-ignore
    this.selectedBusinessName = this.user.firstName + " " + this.user.lastName;

    const store = this.addEditStoreForm.value;
    store.id = this.selectedStore.id;
    store.status = this.selectedStore.status;
    store.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    store.updatedAt = store.createdAt;

    store.storeHolderName = this.selectedBusinessName;

    this.storeService
      .updateStore(store)
      .then(response => {
        this.closeAddEditStore();
      })
      .catch(error => {
        console.log('error', error);
        this.closeAddEditStore();
      });
  }

  closeAddEditStore() {
    this.confirmAddEditStoreModal.hide();
    this.formSubmitted = false;
    this.initAddEditStoreForm();
    this.emitAfterStoreAddedOrEdited();
  }

  emitAfterStoreAddedOrEdited() {
    this.afterStoreAddedOrEdited.emit();
  }

  getBusinessUserList() {
    const searchCriteria = {
      field: 'roles.' + 'business',
      operation: '==',
      value: true
    };

    this.userService
      .searchUserList(searchCriteria)
      .then(userDocuments => {
        const users = [];

        userDocuments.forEach(userDocument => {
          if (userDocument.exists === false) {
            return null;
          } else {
            const user = userDocument.data();
            user.id = userDocument.id;
            users.push(user);
          }
        });

        this.userList = users as [UserModel];
      })
      .catch(error => {
        console.log('error', error);
      });
  }

}
