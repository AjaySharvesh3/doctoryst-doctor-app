import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import _ from "lodash";
import {ProductCategoryModel} from "../../models/product-category.model";

@Component({
  selector: 'app-select-multiple-product-categories',
  templateUrl: './select-multiple-product-categories.component.html',
  styleUrls: ['./select-multiple-product-categories.component.css']
})
export class SelectMultipleProductCategoriesComponent implements OnInit {

  @Input() parentFormGroup: FormGroup;
  @Input() productCategoryList: [ProductCategoryModel];

  selectMultipleProductCategoriesForm: FormGroup;

  get productCategories() {
    return this.selectMultipleProductCategoriesForm.get('productCategories') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.selectMultipleProductCategoriesForm = this.formBuilder.group({
      productCategories: this.formBuilder.array([])
    });
    this.presetCurrentMultipleProductCategories();
  }

  setSelectMultipleProductCategories() {
    const tempSelectedProductCategories = [];

    _.forEach(this.productCategories.value, (productCategory) => {
      if (productCategory.selected) {
        tempSelectedProductCategories.push(productCategory.id);
      }
    });

    this.parentFormGroup.get('productCategories').setValue(tempSelectedProductCategories);
  }

  presetCurrentMultipleProductCategories() {
    _.forEach(this.productCategoryList, (productCategory) => {
      const newFormGroup = this.formBuilder.group({
        id: productCategory.id,
        name: productCategory.name,
        selected: (this.parentFormGroup.get('productCategories') &&
          this.parentFormGroup.get('productCategories').value &&
          this.parentFormGroup.get('productCategories').value.indexOf(productCategory.id) !== -1)
      });

      this.productCategories.push(newFormGroup);
    });
  }

}
