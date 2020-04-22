import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreModel} from '../../models/store.model';
import {AppConstant} from '../../../common/core/constants';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {StoreService} from '../../services/store.service';
import * as firebase from 'firebase';
import _ from 'lodash';
import {faPencilAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../common/user/services/user.service";
import {UserModel} from "../../../common/user/models/user.model";
import {ProductCategoryModel} from "../../../product-category/models/product-category.model";
import {ProductCategoryService} from "../../../product-category/services/product-category.service";

@Component({
  selector: 'app-add-edit-store',
  templateUrl: './add-edit-store.component.html',
  styleUrls: ['./add-edit-store.component.css']
})
export class AddEditStoreComponent implements OnInit {
  addEditStoreForm: FormGroup;
  formSubmitted = false;
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  userList: [UserModel];
  user: UserModel;
  productCategoryList: [ProductCategoryModel];
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
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder) {
  }

  get name() {
    return this.addEditStoreForm.get('name');
  }

  get description() {
    return this.addEditStoreForm.get('description');
  }

  get contact() {
    return this.addEditStoreForm.get('contact');
  }

  get address() {
    return this.addEditStoreForm.get('address') as FormGroup;
  }

  get storeHolder() {
    return this.addEditStoreForm.get('storeHolder') as FormGroup;
  }

  get productCategories() {
    return this.addEditStoreForm.get('productCategories') as FormArray;
  }

  ngOnInit() {
    this.getBusinessUserList();
    this.getProductCategoryList();
    this.initAddEditStoreForm();
  }

  initAddEditStoreForm() {
    this.addEditStoreForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      contact: '',
      storeHolder: this.formBuilder.group({
        storeHolderId: '',
        storeHolderName: ''
      }),
      address: this.formBuilder.group({
        addressLine: '',
        city: '',
        state: '',
      }),
      verifications: {
        email: false,
        aadharCard: false,
      },
      productCategories: this.formBuilder.control(
        [])
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
    this.contact.setValue(existingStore.contact);

    this.storeHolder.get('storeHolderId').setValue(existingStore.storeHolder.storeHolderId);

    this.address.get('addressLine').setValue(existingStore.address.addressLine);
    this.address.get('city').setValue(existingStore.address.city);
    this.address.get('state').setValue(existingStore.address.state);

    this.productCategories.setValue(existingStore.productCategories);
  }

  confirmAddStore() {
    this.formSubmitted = true;

    if (!this.addEditStoreForm.valid) {
      return;
    }

    this.user = _.find(this.userList, {id: this.addEditStoreForm.value.storeHolder.storeHolderId});
    //@ts-ignore
    this.selectedBusinessName = this.user.firstName + " " + this.user.lastName;

    const store = this.addEditStoreForm.value;
    store.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    store.updatedAt = store.createdAt;
    store.status = AppConstant.STATUS.ENABLED;
    store.storeHolder.storeHolderName = this.selectedBusinessName;
    store.verifications.email = true;

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

    this.user = _.find(this.userList, {id: this.addEditStoreForm.value.storeHolder.storeHolderId});
    //@ts-ignore
    this.selectedBusinessName = this.user.firstName + " " + this.user.lastName;

    const store = this.addEditStoreForm.value;
    store.id = this.selectedStore.id;
    store.status = this.selectedStore.status;
    store.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    store.updatedAt = store.createdAt;
    store.verifications.email = true;

    store.storeHolder.storeHolderName = this.selectedBusinessName;

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

  getProductCategoryList() {
    this.startDataFetch();

    this.productCategoryService
      .getProductCategoryList()
      .then(productCategoryDocuments => {
        const productCategories = [];

        productCategoryDocuments.forEach(productCategoryDocument => {
          if (productCategoryDocument.exists === false) {
            return null;
          } else {
            const productCategory = productCategoryDocument.data();
            productCategory.id = productCategoryDocument.id;
            productCategories.push(productCategory);
          }
        });

        this.productCategoryList = productCategories as [ProductCategoryModel];
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
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
