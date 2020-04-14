import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {AppConstant} from '../../core/constants';
import _ from 'lodash';
import {firestore} from 'firebase';
import {AuthService} from '../../core/services';
import FieldValue = firestore.FieldValue;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<UserModel>;
  userDocument: AngularFirestoreDocument<UserModel>;
  users: Observable<UserModel[]>;
  user: Observable<UserModel>;

  constructor(
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore) {
    this.usersCollection = this.angularFirestore
      .collection('users');
  }

  getUserList() {
    return this.usersCollection.ref.get();
  }

  searchUserList(searchCriteria) {
    return this.usersCollection.ref
      .where(searchCriteria.field, searchCriteria.operation, searchCriteria.value)
      .get();
  }

  addUser(user: UserModel) {
    user.createdAt = FieldValue.serverTimestamp();
    user.updatedAt = user.createdAt;
    this.setUserDetailsBeforeAddOrUpdate(user);
    return this.usersCollection.add(user);
  }

  updateUser(user: UserModel) {
    user.updatedAt = FieldValue.serverTimestamp();
    this.setUserDetailsBeforeAddOrUpdate(user);
    return this.usersCollection.doc(user.id).ref.update(user);
  }

  deleteUser(user: UserModel) {
    this.usersCollection.doc(user.id).delete();
  }

  getUserByEmail(email) {
    const searchCriteria = {
      field: 'email',
      operation: '==',
      value: email,
    };

    return this.searchUserList(searchCriteria);
  }

  isOperationUser(email): Promise<boolean> {
    return new Promise((resolve) => {

      if (!email) {
        resolve(false);
      }

      this.getUserByEmail(email)
        .then(changes => {
          const loggedInUser = changes.docs[0].data();
          resolve(loggedInUser && loggedInUser.roles.operation);
        })
        .catch(error => {
          resolve(false);
        });

    });
  }

  isSupportUser(email): Promise<boolean> {
    return new Promise((resolve) => {

      if (!email) {
        resolve(false);
      }

      this.getUserByEmail(email)
        .then(changes => {
          const loggedInUser = changes.docs[0].data();
          resolve(loggedInUser && loggedInUser.roles.support);
        })
        .catch(error => {
          resolve(false);
        });

    });
  }

  isAdminUserLoggedIn(): Promise<boolean> {
    const currentUser = this.authService.getCurrentUser();
    return this.isOperationUser(currentUser.email);
  }

  getUserById(id: string) {
    return this.usersCollection.doc(id).ref.get();
  }

  getLoggedInUserFromSessionStorage() {
    return JSON.parse(this.sessionStorageService.getValue(AppConstant.LOGGED_IN_USER)) || {};
  }

  prepareCreatedByOrUpdatedByUser() {
    const loggedInUser = this.getLoggedInUserFromSessionStorage();
    return {
      email: loggedInUser.email,
      name: loggedInUser.name
    };
  }

  setUserDetailsBeforeAddOrUpdate(details: any) {
    const createdOrUpdatedBy = this.prepareCreatedByOrUpdatedByUser();

    if (details) {
      if (_.isEmpty(details.createdBy)) {
        details.createdBy = createdOrUpdatedBy;
      }

      details.updatedBy = createdOrUpdatedBy;
    }
  }

}
