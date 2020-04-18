import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import _ from 'lodash';
import {StoreModel} from "../../../../stores/models/store.model";
import {StoreService} from "../../../../stores/services/store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UserService} from "../../../../common/user/services/user.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {
  addAadharForm: FormGroup;
  formSubmitted = false;
  isAddAadhar: boolean;

  storeProfile: StoreModel;
  storeId: string;
  showStoreProfileContent: boolean = true;

  @Input() isAddStore: boolean;
  @Output() afterAadharAdded = new EventEmitter();

  confirmAddAadharModal: BsModalRef;
  @ViewChild('addAadharTemplate', {static: true}) addAadharModalTemplate;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  get storeHolder() {
    return this.addAadharForm.get('storeHolder') as FormGroup;
  }

  ngOnInit() {
    this.initAddAadharForm();
    this.getStoreProfile();
  }

  initAddAadharForm() {
    this.addAadharForm = this.formBuilder.group({
      storeHolder: this.formBuilder.group({
        storeHolderId: '',
        storeHolderName: '',
        aadharNumber: '',
        aadharName: '',
        address: ''
      }),
      verifications: {
        email: true,
        aadharCard: false,
      },
    });
  }

  openAddAadhar() {
    this.confirmAddAadharModal = this.modalService.show(this.addAadharModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmAddAadhar() {
    this.formSubmitted = true;

    if (!this.addAadharForm.valid) {
      return;
    }

    const store = this.addAadharForm.value;
    store.id = this.storeId;
    store.storeHolder.storeHolderId = this.storeProfile.storeHolder.storeHolderId;
    store.storeHolder.storeHolderName = this.storeProfile.storeHolder.storeHolderName;
    store.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    store.updatedAt = store.createdAt;
    store.verifications.aadharCard = true;
    store.verifications.email = true;

    this.storeService
      .updateStore(store)
      .then(response => {
          this.confirmAddAadharModal.hide();
          this.formSubmitted = false;
        },
        error => {
          console.log('error', error);
        });
  }

  closeAddAadhar() {
    this.confirmAddAadharModal.hide();
    this.formSubmitted = false;
    this.openAddAadhar();
    this.emitAfterAadharAdded();
  }

  emitAfterAadharAdded() {
    this.afterAadharAdded.emit();
  }

  getStoreProfile() {
    this.detectRouteChanges();

    if (!this.storeId) {
      return;
    }

    this.storeService
      .getStoreById(this.storeId)
      .then(documentSnapshot => {
        this.storeProfile = documentSnapshot.data() as StoreModel;
        this.showStoreProfileContent = false;
      })
      .catch(error => {
        this.showStoreProfileContent = false;
        console.log('error', error);
      });
  }

  detectRouteChanges() {
    this.storeId = _.split(this.router.url, '/');
    this.storeId = this.storeId[2];
  }

}
