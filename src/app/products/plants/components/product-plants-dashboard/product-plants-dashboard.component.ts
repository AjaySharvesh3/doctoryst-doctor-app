import { Component, OnInit } from '@angular/core';
import { faTree, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {PlantsCategoryModel} from "../../models/plants-model/plants-categories.model";
import {PlantCategoryService} from "../../services/plant-category.service";

@Component({
  selector: 'app-product-plants-dashboard',
  templateUrl: './product-plants-dashboard.component.html',
  styleUrls: ['./product-plants-dashboard.component.css']
})
export class ProductPlantsDashboardComponent implements OnInit {
  plantsCategoryList: [PlantsCategoryModel];
  public dataFetchInProgress: boolean;
  public isInitialDataLoad: boolean;
  refreshPlantsCategoryList = false;

  faTree: any = faTree;
  faChevronLeft: any = faChevronLeft;

  constructor(
    private plantsCategoryService: PlantCategoryService
  ) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getPlantsCategoryList();
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

  triggerPlantsCategoryRefresh() {
    this.refreshPlantsCategoryList = true;
  }

}
