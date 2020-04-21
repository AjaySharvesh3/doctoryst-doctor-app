import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppConstant} from "../../../../common/core/constants";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as firebase from "firebase";
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import {PlantsCategoryModel} from "../../models/plants-model/plants-categories.model";
import {PlantCategoryService} from "../../services/plant-category.service";

@Component({
  selector: 'app-add-edit-plants-category',
  templateUrl: './add-edit-plants-category.component.html',
  styleUrls: ['./add-edit-plants-category.component.css']
})
export class AddEditPlantsCategoryComponent implements OnInit {

  addEditPlantCategoryForm: FormGroup;
  formSubmitted = false;

  faPencilAlt: any = faPencilAlt;
  faPlus: any = faPlus;

  @Input() isAddPlantCategory: boolean;
  @Input() isEditPlantCategory: boolean;
  @Input() selectedPlantCategoryId: string;
  @Input() selectedPlantCategory: PlantsCategoryModel;
  @Output() afterPlantCategoryAddedOrEdited = new EventEmitter();

  confirmAddEditPlantCategoryModal: BsModalRef;
  @ViewChild('addEditPlantCategoryTemplate', {static: true}) addEditPlantCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private plantCategoryService: PlantCategoryService,
    private formBuilder: FormBuilder) {
  }

  get name() {
    return this.addEditPlantCategoryForm.get('name');
  }

  get description() {
    return this.addEditPlantCategoryForm.get('description');
  }

  ngOnInit() {
    this.initAddEditPlantCategoryForm();
  }

  initAddEditPlantCategoryForm() {
    this.addEditPlantCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  openAddEditPlantCategory() {
    this.confirmAddEditPlantCategoryModal = this.modalService.show(this.addEditPlantCategoryModalTemplate,
      {
        backdrop: 'static'
      });

    if (this.isEditPlantCategory) {
      this.populatePlantCategoryFormWithExistingPlantCategory(this.selectedPlantCategory);
    }
  }

  populatePlantCategoryFormWithExistingPlantCategory(existingPlantCategory) {
    this.name.setValue(existingPlantCategory.name);
    this.description.setValue(existingPlantCategory.description);
  }

  confirmAddPlantCategory() {
    this.formSubmitted = true;

    if (!this.addEditPlantCategoryForm.valid) {
      return;
    }

    const plantCategory = this.addEditPlantCategoryForm.value;
    plantCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    plantCategory.updatedAt = plantCategory.createdAt;
    plantCategory.status = AppConstant.STATUS.ENABLED;

    this.plantCategoryService
      .addPlantCategory(plantCategory)
      .then(response => {
          this.closeAddEditPlantCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEditPlantCategory() {
    this.formSubmitted = true;

    if (!this.addEditPlantCategoryForm.valid) {
      return;
    }

    const plantCategory = this.addEditPlantCategoryForm.value;
    plantCategory.id = this.selectedPlantCategory.id;
    plantCategory.status = this.selectedPlantCategory.status;
    plantCategory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    plantCategory.updatedAt = plantCategory.createdAt;

    this.plantCategoryService
      .updatePlantCategory(plantCategory)
      .then(response => {
        this.closeAddEditPlantCategory();
      })
      .catch(error => {
        console.log('error', error);
        this.closeAddEditPlantCategory();
      });
  }

  closeAddEditPlantCategory() {
    this.confirmAddEditPlantCategoryModal.hide();
    this.formSubmitted = false;
    this.initAddEditPlantCategoryForm();
    this.emitAfterPlantCategoryAddedOrEdited();
  }

  emitAfterPlantCategoryAddedOrEdited() {
    this.afterPlantCategoryAddedOrEdited.emit();
  }

}
