import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StoreModel} from '../../models/store.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {StoreService} from '../../services/store.service';
import {AppConstant} from '../../../common/core/constants';
import * as firebase from 'firebase';
import {faTrash, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-store',
  templateUrl: './delete-store.component.html',
  styleUrls: ['./delete-store.component.css']
})
export class DeleteStoreComponent implements OnInit {
  formSubmitted = false;
  isDeleteStore: boolean;

  faTrash: any = faTrash;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedStore: StoreModel;
  @Output() afterStoreDeleted = new EventEmitter();

  confirmDeleteStoreModal: BsModalRef;
  @ViewChild('enableDeleteStoreTemplate', {static: true}) enableDeleteStoreModalTemplate;

  constructor(
    private modalService: BsModalService,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedStore) {
      this.isDeleteStore = this.selectedStore.status === AppConstant.STATUS.DELETED;
    }
  }

  openDeleteStore() {
    this.confirmDeleteStoreModal = this.modalService.show(this.enableDeleteStoreModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDeleteStore() {
    this.formSubmitted = true;

    if (!this.selectedStore) {
      return;
    }

    const store = {
      id: this.selectedStore.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DELETED
    };

    this.storeService
      .deleteStore(store)
      .then(response => {
        this.closeDeleteStore();
      },
        error => {
          console.log('error', error);
        });
  }

  closeDeleteStore() {
    this.confirmDeleteStoreModal.hide();
    this.formSubmitted = false;
    this.emitAfterStoreDeleted();
  }

  emitAfterStoreDeleted() {
    this.afterStoreDeleted.emit();
  }

}
