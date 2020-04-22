import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-product-categories',
  templateUrl: './show-product-categories.component.html',
  styleUrls: ['./show-product-categories.component.css']
})
export class ShowProductCategoriesComponent implements OnInit {

  @Input() productCategoryMap;
  @Input() currentProductCategories;
  @Input() currentSingleProductCategory;

  constructor() {
  }

  ngOnInit() {
    this.prepareCurrentProductCategories();
  }

  prepareCurrentProductCategories() {
    if (!this.currentProductCategories) {
      if (this.currentSingleProductCategory) {
        this.currentProductCategories = [];
      }
    }
  }

}
