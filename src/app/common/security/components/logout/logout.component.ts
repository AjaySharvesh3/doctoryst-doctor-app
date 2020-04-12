import {Component, OnInit} from '@angular/core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {AppConstant} from '../../../core/constants';
import {AuthService} from '../../../core/services';
import {SessionStorageService} from '../../../core/services/session-storage.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  faSignInAlt: any = faSignInAlt;

  constructor(private authService: AuthService,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    this.initLogOut();
  }

  initLogOut() {
    this.authService.logout();
    this.sessionStorageService.removeKey(AppConstant.LOGGED_IN_USER);
  }

}
