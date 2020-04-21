import { Component, OnInit } from '@angular/core';
import { faTree } from '@fortawesome/free-solid-svg-icons';
import {AppConstant} from "../../../../common/core/constants";

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  productList = AppConstant.PRODUCT_LIST;

  faTree: any = faTree;

  constructor() { }

  ngOnInit() {
  }

}
