import {Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import _ from "lodash";
import {AppConstant} from "../../../../common/core/constants";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as firebase from "firebase";
import { faPencilAlt, faPlus, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  productThemeColorList = AppConstant.PRODUCT_THEME_COLOR_LIST;
  selectedProductTheme = 'primary';

  inputNameValue: string;
  inputDescriptionValue: string;
  inputProductLogoValue: string;

  faPencilAlt: any = faPencilAlt;
  faPlus: any = faPlus;
  faTrash: any = faTrash;
  faTimes: any = faTimes;

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
    private formBuilder: FormBuilder
  ) {
  }

  setSelectedTheme(roleBrand) {
    this.selectedProductTheme = roleBrand;
  }

  get name() {
    return this.addEditProductCategoryForm.get('name');
  }

  get description() {
    return this.addEditProductCategoryForm.get('description');
  }

  get productLogoUrl() {
    return this.addEditProductCategoryForm.get('productLogoUrl');
  }

  get productThemeColor() {
    return this.addEditProductCategoryForm.get('productThemeColor');
  }

  ngOnInit() {
    this.initAddEditProductCategoryForm();
  }

  initAddEditProductCategoryForm() {
    this.addEditProductCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      productLogoUrl: '',
      productThemeColor: '',
      productThemeColorCode: ''
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
    this.productLogoUrl.setValue(existingProductCategory.productLogoUrl);
    this.productThemeColor.setValue(existingProductCategory.productThemeColor);
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
    let color = this.addEditProductCategoryForm.value.productThemeColor.split(",");
    productCategory.productThemeColor = color[0];
    productCategory.productThemeColorCode = color[1];

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
      console.log('error');
      return;
    }

    const productCategory = this.addEditProductCategoryForm.value;
    console.log(productCategory);
    productCategory.id = this.selectedProductCategory.id;
    productCategory.status = this.selectedProductCategory.status;
    productCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    productCategory.updatedAt = productCategory.createdAt;
    productCategory.productThemeColor = this.selectedProductCategory.productThemeColor;
    productCategory.productThemeColorCode = this.selectedProductCategory.productThemeColorCode;

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
