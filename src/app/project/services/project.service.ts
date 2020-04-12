import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {ProjectModel} from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<ProjectModel>;
  projectDocument: AngularFirestoreDocument<ProjectModel>;
  projects: Observable<ProjectModel[]>;
  project: Observable<ProjectModel>;

  constructor(private angularFirestore: AngularFirestore) {
    this.projectsCollection = this.angularFirestore.collection('projects');
  }

  getProjectList() {
    return this.projectsCollection.ref.get();
  }

  searchProjectList(searchCriteria) {
    return this.projectsCollection.ref
      .where(searchCriteria.field, searchCriteria.operation, searchCriteria.value)
      .get();
  }

  addProject(project: ProjectModel) {
    return this.projectsCollection.add(project);
  }

  getProjectById(id: string) {
    return this.projectsCollection.doc(id).ref.get();
  }

  updateProject(project: ProjectModel) {
    this.projectDocument = this.angularFirestore.doc(`projects/${project.id}`);
    return this.projectDocument.update(project);
  }

}
