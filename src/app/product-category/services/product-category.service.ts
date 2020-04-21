import { Injectable } from '@angular/core';
import {ProductCategoryModel} from "../models/product-category.model";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  productCategoryCollection: AngularFirestoreCollection<ProductCategoryModel>;
  productCategoryDocument: AngularFirestoreDocument<ProductCategoryModel>;
  productCategories: Observable<ProductCategoryModel[]>;
  productCategory: Observable<ProductCategoryModel>;

  constructor(private angularFirestore: AngularFirestore) {
    this.productCategoryCollection = this.angularFirestore.collection('productCategories');
  }

  getProductCategoryList() {
    return this.productCategoryCollection.ref.get();
  }

  searchProductCategoryList(searchCriteria) {
    return this.productCategoryCollection.ref
      .where(searchCriteria.field, searchCriteria.operation, searchCriteria.value)
      .get();
  }

  addProductCategory(productCategory: ProductCategoryModel) {
    return this.productCategoryCollection.add(productCategory);
  }

  getProductCategoryById(id: string) {
    return this.productCategoryCollection.doc(id).ref.get();
  }

  updateProductCategory(productCategory: ProductCategoryModel) {
    this.productCategoryDocument = this.angularFirestore.doc(`productCategories/${productCategory.id}`);
    return this.productCategoryDocument.update(productCategory);
  }

  deleteProductCategory(productCategory: ProductCategoryModel) {
    this.productCategoryDocument = this.angularFirestore.doc(`productCategories/${productCategory.id}`);
    return this.productCategoryDocument.delete();
  }
}
