import { Component, OnInit } from '@angular/core';
import { faHome, faLock } from '@fortawesome/free-solid-svg-icons';
import {AppConstant} from "../../../core/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  faHome: any = faHome;
  faLock: any = faLock;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate([AppConstant.NAVIGATE_TO.home]);
  }

  goToLogin() {
    this.router.navigate([AppConstant.NAVIGATE_TO.login]);
  }

}
