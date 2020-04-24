import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import {StoreModel} from "../../../../stores/models/store.model";
import {StoreService} from "../../../../stores/services/store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductCategoryModel} from "../../../../product-category/models/product-category.model";
import {ProductCategoryService} from "../../../../product-category/services/product-category.service";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css']
})
export class StoreProductsComponent implements OnInit {

  storeProfile: StoreModel;
  productCategoryMap: [ProductCategoryModel];
  storeId: string;
  showStoreProducts: boolean = true;

  faCaretLeft: any = faCaretLeft;

  constructor(
    private storeService: StoreService,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getStoreProfile();
    this.getProductCategoryList();
  }

  getStoreProfile() {
    this.detectRouteChanges();

    if (!this.storeId) {
      return;
    }

    this.storeService
      .getStoreById(this.storeId)
      .then(documentSnapshot => {
        this.storeProfile = documentSnapshot.data() as StoreModel;
        this.showStoreProducts = false;
      })
      .catch(error => {
        this.showStoreProducts = false;
        console.log('error', error);
      });
  }

  getProductCategoryList() {

    this.productCategoryService
      .getProductCategoryList()
      .then(productCategoryDocuments => {
        let productCategories = [];

        productCategoryDocuments.forEach(productCategoryDocuments => {
          let store = productCategoryDocuments.data();
          store.id = productCategoryDocuments.id;
          productCategories.push(store);
        });

        // this.productCategoryMap = productCategories as [ProductCategoryModel];
        this.productCategoryMap = _.keyBy(productCategories as [ProductCategoryModel], 'id');
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  detectRouteChanges() {
    this.storeId = _.split(this.router.url, '/');
    this.storeId = this.storeId[2];
  }

}
