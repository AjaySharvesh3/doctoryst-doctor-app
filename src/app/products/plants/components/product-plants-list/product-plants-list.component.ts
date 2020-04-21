import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { faTree, faChevronLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {PlantsCategoryModel} from "../../models/plants-model/plants-categories.model";
import {PlantCategoryService} from "../../services/plant-category.service";

@Component({
  selector: 'app-product-plants-list',
  templateUrl: './product-plants-list.component.html',
  styleUrls: ['./product-plants-list.component.css']
})
export class ProductPlantsListComponent implements OnInit {
  plantsCategoryList: [PlantsCategoryModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;

  faExclamationTriangle: any = faExclamationTriangle;
  faChevronLeft: any = faChevronLeft;

  @Input() refreshPlantsCategoryList = false;

  constructor(
    private plantsCategoryService: PlantCategoryService
  ) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getPlantsCategoryList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshPlantsCategoryList && !changes.refreshPlantsCategoryList.firstChange
      && changes.refreshPlantsCategoryList.currentValue) {
      this.getPlantsCategoryList();
    }
  }

  getPlantsCategoryList() {
    this.startDataFetch();

    this.plantsCategoryService
      .getPlantsCategoryList()
      .then(plantsCategoryDocuments => {
        let plantsCategories = [];

        plantsCategoryDocuments.forEach(plantsCategoryDocument => {
          let plantsCategory = plantsCategoryDocument.data();
          plantsCategory.id = plantsCategoryDocument.id;
          plantsCategories.push(plantsCategory);
        });

        this.plantsCategoryList = plantsCategories as [PlantsCategoryModel];
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
