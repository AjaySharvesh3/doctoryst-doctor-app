import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppConstant} from "../../../../common/core/constants";
import * as firebase from "firebase";
import {ProductCategoryModel} from "../../models/product-category.model";
import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {ProductCategoryService} from "../../services/product-category.service";

@Component({
  selector: 'app-delete-product-category',
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.css']
})
export class DeleteProductCategoryComponent implements OnInit {
  formSubmitted = false;
  isDeleteProductCategory: boolean;

  faTrash: any = faTrash;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedProductCategory: ProductCategoryModel;
  @Output() afterProductCategoryDeleted = new EventEmitter();

  confirmDeleteProductCategoryModal: BsModalRef;
  @ViewChild('enableDeleteProductCategoryTemplate', {static: true}) enableDeleteProductCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedProductCategory) {
      this.isDeleteProductCategory = this.selectedProductCategory.status === AppConstant.STATUS.DELETED;
    }
  }

  openDeleteProductCategory() {
    this.confirmDeleteProductCategoryModal = this.modalService.show(this.enableDeleteProductCategoryModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDeleteProductCategory() {
    this.formSubmitted = true;

    if (!this.selectedProductCategory) {
      return;
    }

    const productCategory = {
      id: this.selectedProductCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DELETED
    };

    this.productCategoryService
      .deleteProductCategory(productCategory)
      .then(response => {
          this.closeDeleteProductCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  closeDeleteProductCategory() {
    this.confirmDeleteProductCategoryModal.hide();
    this.formSubmitted = false;
    this.emitAfterProductCategoryDeleted();
  }

  emitAfterProductCategoryDeleted() {
    this.afterProductCategoryDeleted.emit();
  }
}
