import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StoreModel} from '../../models/store.model';
import {StoreService} from '../../services/store.service';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {AppConstant} from '../../../common/core/constants';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnChanges {
  storeList: [StoreModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;
  allApps = AppConstant.APPS;

  faExclamationTriangle: any = faExclamationTriangle;

  @Input() refreshStoreList = false;

  constructor(
    private storeService: StoreService) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getStoreList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshStoreList && !changes.refreshStoreList.firstChange
      && changes.refreshStoreList.currentValue) {
      this.getStoreList();
    }
  }

  getStoreList() {
    this.startDataFetch();

    this.storeService
      .getStoreList()
      .then(storeDocuments => {
        let stores = [];

        storeDocuments.forEach(storeDocuments => {
          let store = storeDocuments.data();
          store.id = storeDocuments.id;
          stores.push(store);
        });

        this.storeList = stores as [StoreModel];
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
        this.endDataFetch();
      });
  }

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }

}
