import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent implements OnInit {

  href: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getRouterLink();
  }

  getRouterLink() {
    this.href = this.router.url;
    console.log(this.href);
  }

}
