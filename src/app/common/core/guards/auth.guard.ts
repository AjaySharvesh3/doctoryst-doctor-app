import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../services';
import {AppConstant} from '../constants';
import {SessionStorageService} from '../services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.getAuth()
      .pipe(
        map(user => {
          if (user) {
            this.storeLoggedInUserInSessionStorage(user);
            return true;
          } else {
            this.router.navigate([AppConstant.NAVIGATE_TO.login]);
            return false;
          }
        })
      );
  }

  storeLoggedInUserInSessionStorage(user) {
    if (this.sessionStorageService.hasKey(AppConstant.LOGGED_IN_USER)) {
      return;
    }

    const userDetails = {
      email: user.email,
      name: user.displayName
    };

    this.sessionStorageService.setValue(AppConstant.LOGGED_IN_USER, JSON.stringify(userDetails));
  }
}
