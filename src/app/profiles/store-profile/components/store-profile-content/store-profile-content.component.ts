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
