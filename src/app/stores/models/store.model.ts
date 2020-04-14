export interface StoreModel {
  id?: string;
  name?: string;
  description?: string;
  types?: {
    plantsType: boolean,
    flowersType: boolean,
    gardeningType: boolean,
    toolsType: boolean,
  };
  createdBy?: string;
  createdAt?: {};
  updatedBy?: string;
  updatedAt?: {};
  status?: string;
}
