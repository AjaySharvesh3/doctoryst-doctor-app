import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppConstant} from "../../../../common/core/constants";
import * as firebase from "firebase";
import { faTimes, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {PlantsCategoryModel} from "../../models/plants-model/plants-categories.model";
import {PlantCategoryService} from "../../services/plant-category.service";

@Component({
  selector: 'app-enable-disable-plants-category',
  templateUrl: './enable-disable-plants-category.component.html',
  styleUrls: ['./enable-disable-plants-category.component.css']
})
export class EnableDisablePlantsCategoryComponent implements OnInit {

  formSubmitted = false;
  isDisablePlantsCategory: boolean;
  isEnablePlantsCategory: boolean;

  faTimes: any = faTimes;
  faCheck: any = faCheck;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedPlantsCategory: PlantsCategoryModel;
  @Output() afterPlantsCategoryEnabledOrDisabled = new EventEmitter();

  confirmEnableDisablePlantsCategoryModal: BsModalRef;
  @ViewChild('enableDisablePlantsCategoryTemplate', {static: true}) enableDisablePlantsCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private plantsCategoryService: PlantCategoryService) {
  }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedPlantsCategory) {
      this.isEnablePlantsCategory = this.selectedPlantsCategory.status === AppConstant.STATUS.DISABLED;
      this.isDisablePlantsCategory = this.selectedPlantsCategory.status === AppConstant.STATUS.ENABLED;
    }
  }

  openEnableDisablePlantsCategory() {
    this.confirmEnableDisablePlantsCategoryModal = this.modalService.show(this.enableDisablePlantsCategoryModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDisablePlantsCategory() {
    this.formSubmitted = true;

    if (!this.selectedPlantsCategory) {
      return;
    }

    const plantsCategory = {
      id: this.selectedPlantsCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DISABLED
    };

    this.plantsCategoryService
      .updatePlantCategory(plantsCategory)
      .then(response => {
          this.closeEnableDisablePlantsCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEnablePlantsCategory() {
    this.formSubmitted = true;

    if (!this.selectedPlantsCategory) {
      return;
    }

    const plantsCategory = {
      id: this.selectedPlantsCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.ENABLED
    };

    this.plantsCategoryService
      .updatePlantCategory(plantsCategory)
      .then(response => {
          this.closeEnableDisablePlantsCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  closeEnableDisablePlantsCategory() {
    this.confirmEnableDisablePlantsCategoryModal.hide();
    this.formSubmitted = false;
    this.emitAfterPlantsCategoryEnabledOrDisabled();
  }

  emitAfterPlantsCategoryEnabledOrDisabled() {
    this.afterPlantsCategoryEnabledOrDisabled.emit();
  }
}
