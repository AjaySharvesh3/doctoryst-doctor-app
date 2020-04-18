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
  storeHolderId?: string;
  storeHolderName?: string;
  contact?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  /*storeHolder?: {
    storeHolderId?: string;
    storeHolderName?: string;
    contact?: string;
    storeHolderAddressLine?: string;
    storeHolderCity?: string;
    storeHolderState?: string;
  };*/
  createdBy?: string;
  createdAt?: {};
  updatedBy?: string;
  updatedAt?: {};
  status?: string;
}
