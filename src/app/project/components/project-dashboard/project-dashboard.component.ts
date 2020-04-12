import {Component, OnInit} from '@angular/core';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  refreshProjectList = false;
  faEnvelopeOpenText: any = faEnvelopeOpenText;

  constructor() {
  }

  ngOnInit() {
  }

  triggerProjectRefresh() {
    this.refreshProjectList = true;
  }

}
