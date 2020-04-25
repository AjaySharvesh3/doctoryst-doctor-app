import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../../common/core/constants";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as firebase from "firebase";
import _ from 'lodash';
import {faPencilAlt, faTimes, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {ItemCategoryModel} from "../../models/item-category.model";
import {ItemCategoryService} from "../../services/item-category.service";
import {ProductCategoryModel} from "../../../product-category/models/product-category.model";
import {ProductCategoryService} from "../../../product-category/services/product-category.service";

@Component({
  selector: 'app-add-edit-item-category',
  templateUrl: './add-edit-item-category.component.html',
  styleUrls: ['./add-edit-item-category.component.css']
})
export class AddEditItemCategoryComponent implements OnInit {
  addEditItemCategoryForm: FormGroup;
  formSubmitted = false;
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  productCategoryList: [ProductCategoryModel];

  faPencilAlt: any = faPencilAlt;
  faPlus: any = faPlus;

  @Input() isAddItemCategory: boolean;
  @Input() isEditItemCategory: boolean;
  @Input() selectedItemCategoryId: string;
  @Input() selectedItemCategory: ItemCategoryModel;
  @Output() afterItemCategoryAddedOrEdited = new EventEmitter();

  confirmAddEditItemCategoryModal: BsModalRef;
  @ViewChild('addEditItemCategoryTemplate', {static: true}) addEditItemCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private itemCategoryService: ItemCategoryService,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder
  ) {
  }

  get name() {
    return this.addEditItemCategoryForm.get('name');
  }

  get description() {
    return this.addEditItemCategoryForm.get('description');
  }

  get productCategories(): FormArray {
    return this.addEditItemCategoryForm.get('productCategories') as FormArray;
  }

  get options(): FormArray {
    return this.addEditItemCategoryForm.get('options') as FormArray;
  }

  ngOnInit() {
    this.getProductCategoryList();
  }

  initAddEditItemCategoryForm() {
    this.addEditItemCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      productCategories: this.formBuilder.control(
        []),
      applicableTo: [],
      isMultiple: false,
      options: this.formBuilder.array([])
    });

    if (this.isAddItemCategory) {
      this.addOptionFormGroup({});
    }

  }

  addOptionsClick(): void {
    let emptyOptionFound = false;
    _.forEach(this.options.controls, option => {
      if (_.isEmpty(option.value.name)) {
        emptyOptionFound = true;
      }
    });
    if (!emptyOptionFound) {
      this.addOptionFormGroup({});
    }
  }

  addOptionFormGroup(existingOption) {
    let newOptionFormGroup =this.formBuilder.group({
      name: ['' || existingOption.name],
    });

    this.options.push(newOptionFormGroup);
  }

  openAddEditItemCategory() {
    this.initAddEditItemCategoryForm();

    this.confirmAddEditItemCategoryModal = this.modalService.show(this.addEditItemCategoryModalTemplate,
      {
        class: 'modal-xl',
        backdrop: 'static'
      });

    if (this.isEditItemCategory) {
      this.populateItemCategoryFormWithExistingItemCategory(this.selectedItemCategory);
    }
  }

  populateItemCategoryFormWithExistingItemCategory(existingItemCategory) {
    this.name.setValue(existingItemCategory.name);
    this.description.setValue(existingItemCategory.description);
    this.productCategories.setValue(existingItemCategory.productCategories);

    _.forEach(existingItemCategory.options, option => {
      this.addOptionFormGroup(option);
    })

    this.addOptionFormGroup({});
  }

  confirmAddItemCategory() {
    this.formSubmitted = true;

    if (!this.addEditItemCategoryForm.valid) {
      return;
    }

    this.removeEmptyOptionField();

    const itemCategory = this.addEditItemCategoryForm.value;
    itemCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    itemCategory.updatedAt = itemCategory.createdAt;
    itemCategory.status = AppConstant.STATUS.ENABLED;

    this.itemCategoryService
      .addItemCategory(itemCategory)
      .then(response => {
          this.closeAddEditItemCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  removeEmptyOptionField() {
    let emptyOptionIndex = null;
    _.forEach(this.options.controls, (option, index) => {
      if (_.isEmpty(option.value.name)) {
        emptyOptionIndex = index;
      }
    });
    console.log('emptyOptionIndex', emptyOptionIndex);
    if (emptyOptionIndex) {
      //this.options.removeAt(emptyOptionIndex);
      this.findEmptyAndRemove(emptyOptionIndex);
    }
  }

  findEmptyAndRemove(index: number) {
    this.options.removeAt(index);
    this.removeEmptyOptionField();
  }

  confirmEditItemCategory() {
    this.formSubmitted = true;

    if (!this.addEditItemCategoryForm.valid) {
      console.log('error');
      return;
    }

    this.removeEmptyOptionField();

    const itemCategory = this.addEditItemCategoryForm.value;
    console.log(itemCategory);
    itemCategory.id = this.selectedItemCategory.id;
    itemCategory.status = this.selectedItemCategory.status;
    itemCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    itemCategory.updatedAt = itemCategory.createdAt;

    this.itemCategoryService
      .updateItemCategory(itemCategory)
      .then(response => {
        this.closeAddEditItemCategory();
      })
      .catch(error => {
        console.log('error', error);
        this.closeAddEditItemCategory();
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

  closeAddEditItemCategory() {
    this.confirmAddEditItemCategoryModal.hide();
    this.formSubmitted = false;
    this.initAddEditItemCategoryForm();
    this.emitAfterItemCategoryAddedOrEdited();
  }

  emitAfterItemCategoryAddedOrEdited() {
    this.afterItemCategoryAddedOrEdited.emit();
  }

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }
}
