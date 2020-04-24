import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppConstant} from "../../../common/core/constants";
import * as firebase from "firebase";
import {ItemCategoryModel} from "../../models/item-category.model";
import {ItemCategoryService} from "../../services/item-category.service";
import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-item-category',
  templateUrl: './delete-item-category.component.html',
  styleUrls: ['./delete-item-category.component.css']
})
export class DeleteItemCategoryComponent implements OnInit {
  formSubmitted = false;
  isDeleteItemCategory: boolean;

  faTrash: any = faTrash;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedItemCategory: ItemCategoryModel;
  @Output() afterItemCategoryDeleted = new EventEmitter();

  confirmDeleteItemCategoryModal: BsModalRef;
  @ViewChild('enableDeleteItemCategoryTemplate', {static: true}) enableDeleteItemCategoryModalTemplate;

  constructor(
    private modalService: BsModalService,
    private itemCategoryService: ItemCategoryService
  ) { }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedItemCategory) {
      this.isDeleteItemCategory = this.selectedItemCategory.status === AppConstant.STATUS.DELETED;
    }
  }

  openDeleteItemCategory() {
    this.confirmDeleteItemCategoryModal = this.modalService.show(this.enableDeleteItemCategoryModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDeleteItemCategory() {
    this.formSubmitted = true;

    if (!this.selectedItemCategory) {
      return;
    }

    const itemCategory = {
      id: this.selectedItemCategory.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DELETED
    };

    this.itemCategoryService
      .deleteItemCategory(itemCategory)
      .then(response => {
          this.closeDeleteItemCategory();
        },
        error => {
          console.log('error', error);
        });
  }

  closeDeleteItemCategory() {
    this.confirmDeleteItemCategoryModal.hide();
    this.formSubmitted = false;
    this.emitAfterItemCategoryDeleted();
  }

  emitAfterItemCategoryDeleted() {
    this.afterItemCategoryDeleted.emit();
  }
}
