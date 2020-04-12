import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppConstant} from '../constants';
import {AuthService} from '../services';
import {SessionStorageService} from '../services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.getAuth()
      .pipe(
        map(user => {
          if (user.emailVerified) {
            return true;
          } else {
            this.router.navigate([AppConstant.NAVIGATE_TO.pendingEmailVerification]);
            return false;
          }
        })
      );
  }
}
