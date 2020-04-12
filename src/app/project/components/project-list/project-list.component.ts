import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProjectModel} from '../../models/project.model';
import {ProjectService} from '../../services/project.service';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {AppConstant} from '../../../common/core/constants';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnChanges {
  projectList: [ProjectModel];
  dataFetchInProgress: boolean;
  isInitialDataLoad: boolean;
  allApps = AppConstant.APPS;

  faExclamationTriangle: any = faExclamationTriangle;

  @Input() refreshProjectList = false;

  constructor(
    private projectService: ProjectService) {
  }

  ngOnInit() {
    this.isInitialDataLoad = false;
    this.getProjectList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshProjectList && !changes.refreshProjectList.firstChange
      && changes.refreshProjectList.currentValue) {
      this.getProjectList();
    }
  }

  getProjectList() {
    this.startDataFetch();

    this.projectService
      .getProjectList()
      .then(projectDocuments => {
        let projects = [];

        projectDocuments.forEach(projectDocument => {
          let project = projectDocument.data();
          project.id = projectDocument.id;
          projects.push(project);
        });

        this.projectList = projects as [ProjectModel];
        this.endDataFetch();
      })
      .catch(error => {
        console.log('error', error);
        this.endDataFetch();
      });
  }

  startDataFetch() {
    this.dataFetchInProgress = true;
  }

  endDataFetch() {
    this.isInitialDataLoad = false;
    this.dataFetchInProgress = false;
  }

}
