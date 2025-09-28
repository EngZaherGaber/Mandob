export interface ProductListFilter {
  userId?: number;
  categoryId?: number;
  companyId?: number;
  collectionId?: number;
  globalFilter?: string;
  optionFilters?: { [key: string]: string[] };
  minPrice?: number;
  maxPrice?: number;
  sortBy?: number;
  isDescending?: boolean;
  changeOption?: boolean;
  pageNumber: number;
  pageSize: number;
}
