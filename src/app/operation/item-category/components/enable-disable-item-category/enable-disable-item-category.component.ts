import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppConstant} from "../../../../common/core/constants";
import * as firebase from "firebase";
import { faTimes, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {ItemCategoryModel} from "../../models/item-category.model";
import {ItemCategoryService} from "../../services/item-category.service";

@Component({
  selector: 'app-enable-disable-item-category',
  templateUrl: './enable-disable-item-category.component.html',
  styleUrls: ['./enable-disable-item-category.component.css']
})
export class EnableDisableItemCategoryComponent implements OnInit {
  formSubmitted = false;
  isDisableItemCategory: boolean;
  isEnableItemCategory: boolean;

  faTimes: any = faTimes;
  faCheck: any = faCheck;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedItemCategory: ItemCategoryModel;
  @Output() afterItemCategoryEnabledOrDisabled = new EventEmitter();

  confirmEnableDisableItemCategoryModal: BsModalRef;
  @ViewChild('enableDisableItemCategoryTemplate', {static: true}) enableDisableItemCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private itemCategoryService: ItemCategoryService) {
  }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedItemCategory) {
      this.isEnableItemCategory = this.selectedItemCategory.status === AppConstant.STATUS.DISABLED;
      this.isDisableItemCategory = this.selectedItemCategory.status === AppConstant.STATUS.ENABLED;
    }
  }

  openEnableDisableItemCategory() {
    this.confirmEnableDisableItemCategoryModal = this.modalService.show(this.enableDisableItemCategoryModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDisableItemCategory() {
    this.formSubmitted = true;

    if (!this.selectedItemCategory) {
      return;
    }

    const itemCategory = {
      id: this.selectedItemCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DISABLED
    };

    this.itemCategoryService
      .updateItemCategory(itemCategory)
      .then(response => {
          this.closeEnableDisableItemCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEnableItemCategory() {
    this.formSubmitted = true;

    if (!this.selectedItemCategory) {
      return;
    }

    const itemCategory = {
      id: this.selectedItemCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.ENABLED
    };

    this.itemCategoryService
      .updateItemCategory(itemCategory)
      .then(response => {
          this.closeEnableDisableItemCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  closeEnableDisableItemCategory() {
    this.confirmEnableDisableItemCategoryModal.hide();
    this.formSubmitted = false;
    this.emitAfterItemCategoryEnabledOrDisabled();
  }

  emitAfterItemCategoryEnabledOrDisabled() {
    this.afterItemCategoryEnabledOrDisabled.emit();
  }
}
