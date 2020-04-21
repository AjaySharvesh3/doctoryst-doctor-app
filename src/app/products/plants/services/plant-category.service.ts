import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {PlantsCategoryModel} from "../models/plants-model/plants-categories.model";

@Injectable({
  providedIn: 'root'
})

export class PlantCategoryService {
  plantsCategoryCollection: AngularFirestoreCollection<PlantsCategoryModel>;
  plantsCategoryDocument: AngularFirestoreDocument<PlantsCategoryModel>;
  plantCategories: Observable<PlantsCategoryModel[]>;
  plantCategory: Observable<PlantsCategoryModel>;

  constructor(private angularFirestore: AngularFirestore) {
    this.plantsCategoryCollection = this.angularFirestore.collection('plantCategories');
  }

  getPlantsCategoryList() {
    return this.plantsCategoryCollection.ref.get();
  }

  searchPlantCategoryList(searchCriteria) {
    return this.plantsCategoryCollection.ref
      .where(searchCriteria.field, searchCriteria.operation, searchCriteria.value)
      .get();
  }

  addPlantCategory(plantCategory: PlantsCategoryModel) {
    return this.plantsCategoryCollection.add(plantCategory);
  }

  getPlantCategoryById(id: string) {
    return this.plantsCategoryCollection.doc(id).ref.get();
  }

  updatePlantCategory(plantCategory: PlantsCategoryModel) {
    this.plantsCategoryDocument = this.angularFirestore.doc(`plantCategories/${plantCategory.id}`);
    return this.plantsCategoryDocument.update(plantCategory);
  }

  deletePlantCategory(plantCategory: PlantsCategoryModel) {
    this.plantsCategoryDocument = this.angularFirestore.doc(`plantCategories/${plantCategory.id}`);
    return this.plantsCategoryDocument.delete();
  }
}
