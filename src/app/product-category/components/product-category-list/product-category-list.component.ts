import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppConstant} from "../../../common/core/constants";
import {ProductCategoryModel} from "../../models/product-category.model";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {ProductCategoryService} from "../../services/product-category.service";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit, OnChanges {
  productCategoryList: [ProductCategoryModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  showProductCategories: boolean = true;

  faExclamationTriangle: any = faExclamationTriangle;

  @Input() refreshProductCategoryList = false;

  constructor(
    private productCategoryService: ProductCategoryService) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getProductCategoryList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshProductCategoryList && !changes.refreshProductCategoryList.firstChange
      && changes.refreshProductCategoryList.currentValue) {
      this.getProductCategoryList();
    }
  }

  getColor(productCategory: ProductCategoryModel) {
    return '4px solid ' + productCategory.productThemeColorCode;
  }

  getProductCategoryList() {
    this.startDataFetch();

    this.productCategoryService
      .getProductCategoryList()
      .then(productCategoryDocuments => {
        let productCategories = [];

        productCategoryDocuments.forEach(productCategoryDocuments => {
          let productCategory = productCategoryDocuments.data();
          productCategory.id = productCategoryDocuments.id;
          productCategories.push(productCategory);
        });

        this.productCategoryList = productCategories as [ProductCategoryModel];
        this.showProductCategories = false;
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
        this.endDataFetch();
      });
  }

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }
}
