import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VisibilityDelayService {

  static setMessageVisibilitySmall(parent) {
    VisibilityDelayService.setMessageVisibility(parent, 500);
  }

  static setMessageVisibilityMedium(parent) {
    VisibilityDelayService.setMessageVisibility(parent, 1000);
  }

  static setMessageVisibilityLong(parent) {
    VisibilityDelayService.setMessageVisibility(parent, 2000);
  }

  static setMessageVisibility(parent, delayBy) {
    parent.visible = true;

    setTimeout(() => {
      parent.visible = false;

    }, delayBy);
  }

}
