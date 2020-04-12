import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StoreModel} from '../../models/store.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {StoreService} from '../../services/store.service';
import {AppConstant} from '../../../common/core/constants';
import * as firebase from 'firebase';
import {faCheck, faExclamationTriangle, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enable-disable-store',
  templateUrl: './enable-disable-store.component.html',
  styleUrls: ['./enable-disable-store.component.css']
})
export class EnableDisableStoreComponent implements OnInit {
  formSubmitted = false;
  isDisableStore: boolean;
  isEnableStore: boolean;

  faTimes: any = faTimes;
  faCheck: any = faCheck;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedStore: StoreModel;
  @Output() afterStoreEnabledOrDisabled = new EventEmitter();

  confirmEnableDisableStoreModal: BsModalRef;
  @ViewChild('enableDisableStoreTemplate', {static: true}) enableDisableStoreModalTemplate;

  constructor(
    private modalService: BsModalService,
    private storeService: StoreService) {
  }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedStore) {
      this.isEnableStore = this.selectedStore.status === AppConstant.STATUS.DISABLED;
      this.isDisableStore = this.selectedStore.status === AppConstant.STATUS.ENABLED;
    }
  }

  openEnableDisableStore() {
    this.confirmEnableDisableStoreModal = this.modalService.show(this.enableDisableStoreModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDisableStore() {
    this.formSubmitted = true;

    if (!this.selectedStore) {
      return;
    }

    const store = {
      id: this.selectedStore.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DISABLED
    };

    this.storeService
      .updateStore(store)
      .then(response => {
          this.closeEnableDisableStore();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEnableStore() {
    this.formSubmitted = true;

    if (!this.selectedStore) {
      return;
    }

    const store = {
      id: this.selectedStore.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.ENABLED
    };

    this.storeService
      .updateStore(store)
      .then(response => {
          this.closeEnableDisableStore();
        },
        error => {
          console.log('error', error);
        });
  }

  closeEnableDisableStore() {
    this.confirmEnableDisableStoreModal.hide();
    this.formSubmitted = false;
    this.emitAfterStoreEnabledOrDisabled();
  }

  emitAfterStoreEnabledOrDisabled() {
    this.afterStoreEnabledOrDisabled.emit();
  }

}
