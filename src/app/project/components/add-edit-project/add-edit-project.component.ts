import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectModel} from '../../models/project.model';
import {AppConstant} from '../../../common/core/constants';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProjectService} from '../../services/project.service';
import * as firebase from 'firebase';
import {faPencilAlt, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent implements OnInit {
  addEditProjectForm: FormGroup;
  formSubmitted = false;
  allApps = AppConstant.APPS;

  faPencilAlt: any = faPencilAlt;
  faPlus: any = faPlus;

  @Input() isAddProject: boolean;
  @Input() isEditProject: boolean;
  @Input() selectedProjectId: string;
  @Input() selectedProject: ProjectModel;
  @Output() afterProjectAddedOrEdited = new EventEmitter();

  confirmAddEditProjectModal: BsModalRef;
  @ViewChild('addEditProjectTemplate', {static: true}) addEditProjectModalTemplate;

  constructor(
    private modalService: BsModalService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder) {
  }

  get name() {
    return this.addEditProjectForm.get('name');
  }

  get description() {
    return this.addEditProjectForm.get('description');
  }

  get apps() {
    return this.addEditProjectForm.get('apps') as FormGroup;
  }

  ngOnInit() {
    this.initAddEditProjectForm();
  }

  initAddEditProjectForm() {
    this.addEditProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      apps: this.formBuilder.group({
        angularApp: false,
        nodeRestApi: false
      })
    });
  }

  openAddEditProject() {
    this.confirmAddEditProjectModal = this.modalService.show(this.addEditProjectModalTemplate,
      {
        backdrop: 'static'
      });

    if (this.isEditProject) {
      this.populateProjectFormWithExistingProject(this.selectedProject);
    }
  }

  populateProjectFormWithExistingProject(existingProject) {
    this.name.setValue(existingProject.name);
    this.description.setValue(existingProject.description);

    if (existingProject.apps) {
      this.apps.setValue(existingProject.apps);
    }
  }

  confirmAddProject() {
    this.formSubmitted = true;

    if (!this.addEditProjectForm.valid) {
      return;
    }

    const project = this.addEditProjectForm.value;
    project.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    project.updatedAt = project.createdAt;
    project.status = AppConstant.STATUS.ENABLED;

    this.projectService
      .addProject(project)
      .then(response => {
          this.closeAddEditProject();
        },
        error => {
          console.log('error', error);
        });
  }

  confirmEditProject() {
    this.formSubmitted = true;

    if (!this.addEditProjectForm.valid) {
      return;
    }

    const project = this.addEditProjectForm.value;
    project.id = this.selectedProject.id;
    project.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    project.status = this.selectedProject.status;

    this.projectService
      .updateProject(project)
      .then(response => {
        this.closeAddEditProject();
      })
      .catch(error => {
        console.log('error', error);
        this.closeAddEditProject();
      });

  }

  closeAddEditProject() {
    this.confirmAddEditProjectModal.hide();
    this.formSubmitted = false;
    this.initAddEditProjectForm();
    this.emitAfterProjectAddedOrEdited();
  }

  emitAfterProjectAddedOrEdited() {
    this.afterProjectAddedOrEdited.emit();
  }

}
