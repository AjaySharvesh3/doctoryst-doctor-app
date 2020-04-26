import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ItemCategoryModel} from "../../models/item-category.model";
import _ from 'lodash';
import { faExclamationTriangle, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {ProductCategoryModel} from "../../../product-category/models/product-category.model";
import {ProductCategoryService} from "../../../product-category/services/product-category.service";
import {ItemCategoryService} from "../../services/item-category.service";

@Component({
  selector: 'app-item-category-option-list',
  templateUrl: './item-category-option-list.component.html',
  styleUrls: ['./item-category-option-list.component.css']
})
export class ItemCategoryOptionListComponent implements OnInit, OnChanges {
  productCategoryMap: [ProductCategoryModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  faExclamationTriangle: any = faExclamationTriangle;
  faTrash: any = faTrash;
  faPencilAlt: any = faPencilAlt;

  @Input() refreshItemCategoryList = false;
  @Input() itemCategoryData: ItemCategoryModel;

  constructor(
    private productCategoryService: ProductCategoryService,
    private itemCategoryService: ItemCategoryService
  ) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getProductCategoryList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshItemCategoryList && !changes.refreshItemCategoryList.firstChange
      && changes.refreshItemCategoryList.currentValue) {
      this.getProductCategoryList();
    }
  }

  getProductCategoryList() {
    this.startDataFetch();

    this.productCategoryService
      .getProductCategoryList()
      .then(productCategoryDocuments => {
        const productCategories = [];

        productCategoryDocuments.forEach(productCategoryDocuments => {
          let store = productCategoryDocuments.data();
          store.id = productCategoryDocuments.id;
          productCategories.push(store);
        });

        this.productCategoryMap = _.keyBy(productCategories as [ProductCategoryModel], 'id');
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
        this.endDataFetch();
      });
  }

  editSelectedItemOption(index: number) {
    console.log('from item-category-option-list', this.itemCategoryData.options[index]);
  }

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }
}
