import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppConstant} from "../../../../common/core/constants";
import * as firebase from "firebase";
import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {PlantsCategoryModel} from "../../models/plants-model/plants-categories.model";
import {PlantCategoryService} from "../../services/plant-category.service";

@Component({
  selector: 'app-delete-plants-category',
  templateUrl: './delete-plants-category.component.html',
  styleUrls: ['./delete-plants-category.component.css']
})
export class DeletePlantsCategoryComponent implements OnInit {
  formSubmitted = false;
  isDeletePlantsCategory: boolean;

  faTrash: any = faTrash;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedPlantsCategory: PlantsCategoryModel;
  @Output() afterPlantsCategoryDeleted = new EventEmitter();

  confirmDeletePlantsCategoryModal: BsModalRef;
  @ViewChild('enableDeletePlantsCategoryTemplate', {static: true}) enableDeletePlantsCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private plantCategoryService: PlantCategoryService
  ) { }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedPlantsCategory) {
      this.isDeletePlantsCategory = this.selectedPlantsCategory.status === AppConstant.STATUS.DELETED;
    }
  }

  openDeletePlantsCategory() {
    this.confirmDeletePlantsCategoryModal = this.modalService.show(this.enableDeletePlantsCategoryModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDeletePlantsCategory() {
    this.formSubmitted = true;

    if (!this.selectedPlantsCategory) {
      return;
    }

    const plantsCategory = {
      id: this.selectedPlantsCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DELETED
    };

    this.plantCategoryService
      .deletePlantCategory(plantsCategory)
      .then(response => {
          this.closeDeletePlantsCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  closeDeletePlantsCategory() {
    this.confirmDeletePlantsCategoryModal.hide();
    this.formSubmitted = false;
    this.emitAfterPlantsCategoryDeleted();
  }

  emitAfterPlantsCategoryDeleted() {
    this.afterPlantsCategoryDeleted.emit();
  }

}
