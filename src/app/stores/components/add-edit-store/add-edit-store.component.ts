import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreModel} from '../../models/store.model';
import {AppConstant} from '../../../common/core/constants';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {StoreService} from '../../services/store.service';
import * as firebase from 'firebase';
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

  get types() {
    return this.addEditStoreForm.get('types') as FormGroup;
  }

  ngOnInit() {
    this.initAddEditStoreForm();
    this.getUserList();
  }

  initAddEditStoreForm() {
    this.addEditStoreForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      storeHolderId: '',
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

    if (existingStore.types) {
      this.types.setValue(existingStore.types);
    }
  }

  confirmAddStore() {
    this.formSubmitted = true;

    if (!this.addEditStoreForm.valid) {
      return;
    }

    const store = this.addEditStoreForm.value;
    store.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    store.updatedAt = store.createdAt;
    store.status = AppConstant.STATUS.ENABLED;

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

    const store = this.addEditStoreForm.value;
    store.id = this.selectedStore.id;
    store.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    store.status = this.selectedStore.status;

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

  getUserList() {
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
      })
      .catch(error => {
        console.log('error', error);
      });
  }

}
