import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth) {
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {

      this.angularFireAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), error => reject(error));

    });
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {

      this.angularFireAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), error => reject(error));

    });
  }

  getAuth() {
    return this.angularFireAuth.authState;
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  deleteCurrentUser() {
    return this.angularFireAuth.auth.currentUser.delete();
  }

  getCurrentUser() {
    return this.angularFireAuth.auth.currentUser;
  }

  updateUserDisplayName(userFullName) {
    const user = this.getCurrentUser();
    return user.updateProfile({
      displayName: userFullName
    });
  }

  initiatePasswordResetEmail(email) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  verifyPasswordResetAction(code) {
    return this.angularFireAuth.auth.verifyPasswordResetCode(code);
  }

  confirmPasswordReset(code: string, password: string) {
    return this.angularFireAuth.auth.confirmPasswordReset(code, password);
  }

  verifyEmailAction(code) {
    return this.angularFireAuth.auth.applyActionCode(code);
  }

}
