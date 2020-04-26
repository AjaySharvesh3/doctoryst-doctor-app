import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StoreModel} from '../../models/store.model';
import _ from 'lodash';
import {StoreService} from '../../services/store.service';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {ProductCategoryModel} from "../../../product-category/models/product-category.model";
import {ProductCategoryService} from "../../../product-category/services/product-category.service";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnChanges {
  storeList: [StoreModel];
  productCategoryMap: [ProductCategoryModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  showStores: boolean = true;

  faExclamationTriangle: any = faExclamationTriangle;

  @Input() refreshStoreList = false;

  constructor(
    private storeService: StoreService,
    private productCategoryService: ProductCategoryService,
  ) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getStoreList();
    this.getProductCategoryList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshStoreList && !changes.refreshStoreList.firstChange
      && changes.refreshStoreList.currentValue) {
      this.getStoreList();
    }
  }

  getStoreList() {
    this.startDataFetch();

    this.storeService
      .getStoreList()
      .then(storeDocuments => {
        let stores = [];

        storeDocuments.forEach(storeDocuments => {
          let store = storeDocuments.data();
          store.id = storeDocuments.id;
          stores.push(store);
        });

        this.storeList = stores as [StoreModel];
        this.showStores = false;
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
        this.endDataFetch();
      });
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

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }

}
