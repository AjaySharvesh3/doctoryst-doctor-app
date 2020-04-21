import { Component, OnInit } from '@angular/core';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-category-dashboard',
  templateUrl: './product-category-dashboard.component.html',
  styleUrls: ['./product-category-dashboard.component.css']
})
export class ProductCategoryDashboardComponent implements OnInit {
  refreshProductCategoryList = false;
  faEnvelopeOpenText: any = faEnvelopeOpenText;

  constructor() {
  }

  ngOnInit() {
  }

  triggerProductCategoryRefresh() {
    this.refreshProductCategoryList = true;
  }

}
