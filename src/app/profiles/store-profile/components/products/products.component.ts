import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import {StoreModel} from "../../../../stores/models/store.model";
import {StoreService} from "../../../../stores/services/store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  storeProfile: StoreModel;
  storeId: string;
  showStoreProfileContent: boolean = true;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getStoreProfile();
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

  detectRouteChanges() {
    this.storeId = _.split(this.router.url, '/');
    this.storeId = this.storeId[2];
  }

}
