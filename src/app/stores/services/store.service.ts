import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {StoreModel} from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  storesCollection: AngularFirestoreCollection<StoreModel>;
  storeDocument: AngularFirestoreDocument<StoreModel>;
  stores: Observable<StoreModel[]>;
  store: Observable<StoreModel>;

  constructor(private angularFirestore: AngularFirestore) {
    this.storesCollection = this.angularFirestore.collection('stores');
  }

  getStoreList() {
    return this.storesCollection.ref.get();
  }

  searchStoreList(searchCriteria) {
    return this.storesCollection.ref
      .where(searchCriteria.field, searchCriteria.operation, searchCriteria.value)
      .get();
  }

  addStore(store: StoreModel) {
    return this.storesCollection.add(store);
  }

  getStoreById(id: string) {
    return this.storesCollection.doc(id).ref.get();
  }

  updateStore(store: StoreModel) {
    this.storeDocument = this.angularFirestore.doc(`stores/${store.id}`);
    return this.storeDocument.update(store);
  }

  deleteStore(store: StoreModel) {
    this.storeDocument = this.angularFirestore.doc(`stores/${store.id}`);
    return this.storeDocument.delete();
  }

}
