import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppConstant} from "../../../common/core/constants";
import * as firebase from "firebase";
import { faTimes, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {ProductCategoryModel} from "../../models/product-category.model";
import {ProductCategoryService} from "../../services/product-category.service";

@Component({
  selector: 'app-enable-disable-product-category',
  templateUrl: './enable-disable-product-category.component.html',
  styleUrls: ['./enable-disable-product-category.component.css']
})
export class EnableDisableProductCategoryComponent implements OnInit {
  formSubmitted = false;
  isDisableProductCategory: boolean;
  isEnableProductCategory: boolean;

  faTimes: any = faTimes;
  faCheck: any = faCheck;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedProductCategory: ProductCategoryModel;
  @Output() afterProductCategoryEnabledOrDisabled = new EventEmitter();

  confirmEnableDisableProductCategoryModal: BsModalRef;
  @ViewChild('enableDisableProductCategoryTemplate', {static: true}) enableDisableProductCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedProductCategory) {
      this.isEnableProductCategory = this.selectedProductCategory.status === AppConstant.STATUS.DISABLED;
      this.isDisableProductCategory = this.selectedProductCategory.status === AppConstant.STATUS.ENABLED;
    }
  }

  openEnableDisableProductCategory() {
    this.confirmEnableDisableProductCategoryModal = this.modalService.show(this.enableDisableProductCategoryModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDisableProductCategory() {
    this.formSubmitted = true;

    if (!this.selectedProductCategory) {
      return;
    }

    const productCategory = {
      id: this.selectedProductCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DISABLED
    };

    this.productCategoryService
      .updateProductCategory(productCategory)
      .then(response => {
          this.closeEnableDisableProductCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEnableProductCategory() {
    this.formSubmitted = true;

    if (!this.selectedProductCategory) {
      return;
    }

    const productCategory = {
      id: this.selectedProductCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.ENABLED
    };

    this.productCategoryService
      .updateProductCategory(productCategory)
      .then(response => {
          this.closeEnableDisableProductCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  closeEnableDisableProductCategory() {
    this.confirmEnableDisableProductCategoryModal.hide();
    this.formSubmitted = false;
    this.emitAfterProductCategoryEnabledOrDisabled();
  }

  emitAfterProductCategoryEnabledOrDisabled() {
    this.afterProductCategoryEnabledOrDisabled.emit();
  }
}
