import { Component, OnInit } from '@angular/core';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import {ItemCategoryModel} from "../../models/item-category.model";

@Component({
  selector: 'app-item-category-dashboard',
  templateUrl: './item-category-dashboard.component.html',
  styleUrls: ['./item-category-dashboard.component.css']
})
export class ItemCategoryDashboardComponent implements OnInit {
  refreshItemCategoryList = false;
  faEnvelopeOpenText: any = faEnvelopeOpenText;

  itemCategoryData: ItemCategoryModel;

  constructor() {
  }

  ngOnInit() {
  }

  triggerItemCategoryRefresh() {
    this.refreshItemCategoryList = true;
  }

  gotItemCategoryData($event) {
    this.itemCategoryData = $event;
  }

}
