import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faTree, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {FormGroup} from "@angular/forms";
import {PlantsCategory} from "../../models/plants-model/plants-categories.model";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-product-plants',
  templateUrl: './product-plants.component.html',
  styleUrls: ['./product-plants.component.css']
})
export class ProductPlantsComponent implements OnInit {
  addPlantsCategoryForm: FormGroup;
  formSubmitted = false;

  plantsCategory: PlantsCategory;
  selectedPlantsCategoryName: string;

  faTree: any = faTree;
  faChevronLeft: any = faChevronLeft;

  @Input() isAddPlantsCategory: boolean;
  @Input() isEditPlantsCategory: boolean;
  @Input() selectedPlantsCategoryId: string;
  @Input() selectedPlantsCategory: PlantsCategory;
  @Output() afterPlanstCategoryAddedOrEdited = new EventEmitter();

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openAddCategory() {

  }

}
