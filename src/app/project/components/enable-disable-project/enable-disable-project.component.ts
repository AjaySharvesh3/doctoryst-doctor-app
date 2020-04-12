import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectModel} from '../../models/project.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProjectService} from '../../services/project.service';
import {AppConstant} from '../../../common/core/constants';
import * as firebase from 'firebase';
import {faCheck, faExclamationTriangle, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enable-disable-project',
  templateUrl: './enable-disable-project.component.html',
  styleUrls: ['./enable-disable-project.component.css']
})
export class EnableDisableProjectComponent implements OnInit {
  formSubmitted = false;
  isDisableProject: boolean;
  isEnableProject: boolean;

  faTimes: any = faTimes;
  faCheck: any = faCheck;
  faExclamationTriangle: any = faExclamationTriangle;

  @Input() selectedProject: ProjectModel;
  @Output() afterProjectEnabledOrDisabled = new EventEmitter();

  confirmEnableDisableProjectModal: BsModalRef;
  @ViewChild('enableDisableProjectTemplate', {static: true}) enableDisableProjectModalTemplate;

  constructor(
    private modalService: BsModalService,
    private projectService: ProjectService) {
  }

  ngOnInit() {
    this.determineAction();
  }

  determineAction() {
    if (this.selectedProject) {
      this.isEnableProject = this.selectedProject.status === AppConstant.STATUS.DISABLED;
      this.isDisableProject = this.selectedProject.status === AppConstant.STATUS.ENABLED;
    }
  }

  openEnableDisableProject() {
    this.confirmEnableDisableProjectModal = this.modalService.show(this.enableDisableProjectModalTemplate,
      {
        backdrop: 'static'
      });
  }

  confirmDisableProject() {
    this.formSubmitted = true;

    if (!this.selectedProject) {
      return;
    }

    const project = {
      id: this.selectedProject.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.DISABLED
    };

    this.projectService
      .updateProject(project)
      .then(response => {
          this.closeEnableDisableProject();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEnableProject() {
    this.formSubmitted = true;

    if (!this.selectedProject) {
      return;
    }

    const project = {
      id: this.selectedProject.id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: AppConstant.STATUS.ENABLED
    };

    this.projectService
      .updateProject(project)
      .then(response => {
          this.closeEnableDisableProject();
        },
        error => {
          console.log('error', error);
        });
  }

  closeEnableDisableProject() {
    this.confirmEnableDisableProjectModal.hide();
    this.formSubmitted = false;
    this.emitAfterProjectEnabledOrDisabled();
  }

  emitAfterProjectEnabledOrDisabled() {
    this.afterProjectEnabledOrDisabled.emit();
  }

}
