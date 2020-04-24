import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {ItemCategoryModel} from "../models/item-category.model";

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
  itemCategoryCollection: AngularFirestoreCollection<ItemCategoryModel>;
  itemCategoryDocument: AngularFirestoreDocument<ItemCategoryModel>;
  itemCategories: Observable<ItemCategoryModel[]>;
  itemCategory: Observable<ItemCategoryModel>;

  constructor(private angularFirestore: AngularFirestore) {
    this.itemCategoryCollection = this.angularFirestore.collection('itemCategories');
  }

  getItemCategoryList() {
    return this.itemCategoryCollection.ref.get();
  }

  searchItemCategoryList(searchCriteria) {
    return this.itemCategoryCollection.ref
      .where(searchCriteria.field, searchCriteria.operation, searchCriteria.value)
      .get();
  }

  addItemCategory(itemCategory: ItemCategoryModel) {
    return this.itemCategoryCollection.add(itemCategory);
  }

  getItemCategoryById(id: string) {
    return this.itemCategoryCollection.doc(id).ref.get();
  }

  updateItemCategory(itemCategory: ItemCategoryModel) {
    this.itemCategoryDocument = this.angularFirestore.doc(`itemCategories/${itemCategory.id}`);
    return this.itemCategoryDocument.update(itemCategory);
  }

  deleteItemCategory(itemCategory: ItemCategoryModel) {
    this.itemCategoryDocument = this.angularFirestore.doc(`itemCategories/${itemCategory.id}`);
    return this.itemCategoryDocument.delete();
  }
}
