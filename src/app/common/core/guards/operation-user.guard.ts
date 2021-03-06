import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services';
import {UserService} from '../../user/services/user.service';
import {AppConstant} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class OperationUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
  }

  canActivate(): Promise<boolean> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      return this.userService.isOperationUser(currentUser.email);
    } else {
      this.router.navigate([AppConstant.NAVIGATE_TO.login]);
      return new Promise<boolean>((resolve => resolve(false)));
    }
  }

}
