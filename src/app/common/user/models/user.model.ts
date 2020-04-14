export interface UserModel {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  homePhone?: number;
  cellPhone?: number;
  address?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateCode?: string;
    countryCode?: string;
    zipCode?: number;
  };
  roles?: {
    operation: boolean,
    support: boolean,
    business: boolean
  };
  createdBy?: {
    name: string;
    email: string;
  };
  createdAt?: {};
  updatedBy?: {
    name: string;
    email: string;
  };
  updatedAt?: {};
  status?: string;
}
