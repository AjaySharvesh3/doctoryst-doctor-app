import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import {StoreModel} from "../../../../stores/models/store.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../../../stores/services/store.service";
import {AppConstant} from "../../../../common/core/constants";

@Component({
  selector: 'app-store-profile-content',
  templateUrl: './store-profile-content.component.html',
  styleUrls: ['./store-profile-content.component.css']
})
export class StoreProfileContentComponent implements OnInit {

  storeProfileMenu = AppConstant.STORE_PROFILE_LIST;
  storeProfile: StoreModel;
  storeId: string;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getStoreProfile();
  }

  getStoreProfile() {
    this.storeId = _.split(this.router.url, '/');
    this.storeId = this.storeId[2];

    if (!this.storeId) {
      return;
    }

    this.storeService
      .getStoreById(this.storeId)
      .then(documentSnapshot => {
        this.storeProfile = documentSnapshot.data() as StoreModel;
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
