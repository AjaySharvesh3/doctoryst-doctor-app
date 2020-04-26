import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-product-categories-in-card',
  templateUrl: './show-product-categories-in-card.component.html',
  styleUrls: ['./show-product-categories-in-card.component.css']
})
export class ShowProductCategoriesInCardComponent implements OnInit {

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
