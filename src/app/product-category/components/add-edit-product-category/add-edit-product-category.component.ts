import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../../common/core/constants";
import {UserModel} from "../../../common/user/models/user.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UserService} from "../../../common/user/services/user.service";
import * as firebase from "firebase";
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import {ProductCategoryModel} from "../../models/product-category.model";
import {ProductCategoryService} from "../../services/product-category.service";

@Component({
  selector: 'app-add-edit-product-category',
  templateUrl: './add-edit-product-category.component.html',
  styleUrls: ['./add-edit-product-category.component.css']
})
export class AddEditProductCategoryComponent implements OnInit {
  addEditProductCategoryForm: FormGroup;
  formSubmitted = false;

  selectedBusinessName: string;

  faPencilAlt: any = faPencilAlt;
  faPlus: any = faPlus;

  @Input() isAddProductCategory: boolean;
  @Input() isEditProductCategory: boolean;
  @Input() selectedProductCategoryId: string;
  @Input() selectedProductCategory: ProductCategoryModel;
  @Output() afterProductCategoryAddedOrEdited = new EventEmitter();

  confirmAddEditProductCategoryModal: BsModalRef;
  @ViewChild('addEditProductCategoryTemplate', {static: true}) addEditProductCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder) {
  }

  get name() {
    return this.addEditProductCategoryForm.get('name');
  }

  get description() {
    return this.addEditProductCategoryForm.get('description');
  }

  ngOnInit() {
    this.initAddEditProductCategoryForm();
  }

  initAddEditProductCategoryForm() {
    this.addEditProductCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  openAddEditProductCategory() {
    this.confirmAddEditProductCategoryModal = this.modalService.show(this.addEditProductCategoryModalTemplate,
      {
        backdrop: 'static'
      });

    if (this.isEditProductCategory) {
      this.populateProductCategoryFormWithExistingProductCategory(this.selectedProductCategory);
    }
  }

  populateProductCategoryFormWithExistingProductCategory(existingProductCategory) {
    this.name.setValue(existingProductCategory.name);
    this.description.setValue(existingProductCategory.description);
  }

  confirmAddProductCategory() {
    this.formSubmitted = true;

    if (!this.addEditProductCategoryForm.valid) {
      return;
    }

    const productCategory = this.addEditProductCategoryForm.value;
    productCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    productCategory.updatedAt = productCategory.createdAt;
    productCategory.status = AppConstant.STATUS.ENABLED;

    this.productCategoryService
      .addProductCategory(productCategory)
      .then(response => {
          this.closeAddEditProductCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEditProductCategory() {
    this.formSubmitted = true;

    if (!this.addEditProductCategoryForm.valid) {
      return;
    }

    const productCategory = this.addEditProductCategoryForm.value;
    productCategory.id = this.selectedProductCategory.id;
    productCategory.status = this.selectedProductCategory.status;
    productCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    productCategory.updatedAt = productCategory.createdAt;

    this.productCategoryService
      .updateProductCategory(productCategory)
      .then(response => {
        this.closeAddEditProductCategory();
      })
      .catch(error => {
        console.log('error', error);
        this.closeAddEditProductCategory();
      });
  }

  closeAddEditProductCategory() {
    this.confirmAddEditProductCategoryModal.hide();
    this.formSubmitted = false;
    this.initAddEditProductCategoryForm();
    this.emitAfterProductCategoryAddedOrEdited();
  }

  emitAfterProductCategoryAddedOrEdited() {
    this.afterProductCategoryAddedOrEdited.emit();
  }

}
