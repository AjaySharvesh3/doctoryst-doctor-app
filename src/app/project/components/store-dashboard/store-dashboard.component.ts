import {Component, OnInit} from '@angular/core';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-store-dashboard',
  templateUrl: './store-dashboard.component.html',
  styleUrls: ['./store-dashboard.component.css']
})
export class StoreDashboardComponent implements OnInit {
  refreshStoreList = false;
  faEnvelopeOpenText: any = faEnvelopeOpenText;

  constructor() {
  }

  ngOnInit() {
  }

  triggerStoreRefresh() {
    this.refreshStoreList = true;
  }

}
