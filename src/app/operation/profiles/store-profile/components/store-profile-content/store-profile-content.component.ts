import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import {StoreModel} from "../../../../stores/models/store.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../../../stores/services/store.service";
import {AppConstant} from "../../../../../common/core/constants";
import {ProductCategoryModel} from "../../../../product-category/models/product-category.model";
import {ProductCategoryService} from "../../../../product-category/services/product-category.service";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-store-profile-content',
  templateUrl: './store-profile-content.component.html',
  styleUrls: ['./store-profile-content.component.css']
})
export class StoreProfileContentComponent implements OnInit {

  storeProfile: StoreModel;
  storeId: string;
  showStoreProfileContent: boolean = true;
  productCategoryMap: [ProductCategoryModel];

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
        this.showStoreProfileContent = false;
      })
      .catch(error => {
        this.showStoreProfileContent = false;
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
