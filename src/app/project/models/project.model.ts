export interface ProjectModel {
  id?: string;
  name?: string;
  description?: string;
  apps?: {
    angularApp: boolean,
    nodeRestApi: boolean
  };
  createdBy?: string;
  createdAt?: {};
  updatedBy?: string;
  updatedAt?: {};
  status?: string;
}
