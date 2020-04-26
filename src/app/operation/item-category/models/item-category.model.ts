export interface ItemCategoryModel {
  id?: string;
  name?: string;
  description?: string;
  options?: [
    {
      name?: string;
    }
  ];
  productCategories?: [string];
  applicableTo?: [string];
  isMultiple?: boolean;

  createdBy?: string;
  createdAt?: {};
  updatedBy?: string;
  updatedAt?: {};

  status?: string;
}
