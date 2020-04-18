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
  contact?: string;
  storeHolder?: {
    storeHolderId?: string;
    storeHolderName?: string;
    aadharNumber?: string;
    aadharName?: string;
    address?: string;
  };
  address?: {
    addressLine?: string;
    city?: string;
    state?: string;
  };
  verifications?: {
    email: boolean;
    aadharCard: boolean;
  };
  createdBy?: string;
  createdAt?: {};
  updatedBy?: string;
  updatedAt?: {};
  status?: string;
}
