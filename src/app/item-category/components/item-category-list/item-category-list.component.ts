import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {ItemCategoryModel} from "../../models/item-category.model";
import {ItemCategoryService} from "../../services/item-category.service";

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.css']
})
export class ItemCategoryListComponent implements OnInit, OnChanges {
  itemCategoryList: [ItemCategoryModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  faExclamationTriangle: any = faExclamationTriangle;

  @Input() refreshItemCategoryList = false;
  @Output() emitItemCategoryDetails = new EventEmitter<ItemCategoryModel>();
  @Input() selectedItemCategoryData: ItemCategoryModel;

  constructor(
    private itemCategoryService: ItemCategoryService) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getItemCategoryList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshItemCategoryList && !changes.refreshItemCategoryList.firstChange
      && changes.refreshItemCategoryList.currentValue) {
      this.getItemCategoryList();
    }
  }

  getItemCategoryList() {
    this.startDataFetch();

    this.itemCategoryService
      .getItemCategoryList()
      .then(itemCategoryDocuments => {
        let itemCategories = [];

        itemCategoryDocuments.forEach(itemCategoryDocuments => {
          let itemCategory = itemCategoryDocuments.data();
          itemCategory.id = itemCategoryDocuments.id;
          itemCategories.push(itemCategory);
        });

        this.itemCategoryList = itemCategories as [ItemCategoryModel];
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

  emitAfterItemCategorySelected(itemCategory: ItemCategoryModel) {
    this.selectedItemCategoryData = itemCategory;
    this.emitItemCategoryDetails.emit(this.selectedItemCategoryData);
  }
}
