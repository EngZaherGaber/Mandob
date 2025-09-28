import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../shared/interface/response';
import { ProductManagementAdd } from '../interfaces/product-management-add';
import { ProductManagementItem } from '../interfaces/product-management-item';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  url = environment.api + 'ProductManagement/';
  constructor(private http: HttpClient) {}
  getAll(body: TableLazyLoadEvent) {
    return this.http.post<APIResponse<any[]>>(this.url + 'getall', body);
  }
  getOne(id: number) {
    return this.http.get<APIResponse<ProductManagementItem>>(this.url + id);
  }
  edit(id: number, body: ProductManagementAdd, files: File[]) {
    const formData = new FormData();
    //TODO:
    // Append files
    files.forEach((file, i) => {
      formData.append(`ProductImages`, file, file.name);
    });

    // ProductName, ProductDescription
    formData.append('ProductName', body.productName);
    formData.append('ProductDescription', body.productDescription);

    // CollectionIDs
    body.collectionIDs.forEach((id, i) => {
      formData.append(`CollectionIDs[${i}]`, id.toString());
    });

    // CategorieIDs
    body.categorieIDs.forEach((id, i) => {
      formData.append(`CategorieIDs[${i}]`, id.toString());
    });

    // Options
    body.options.forEach((opt, i) => {
      formData.append(`Options[${i}].optionName`, opt.optionName);

      opt.values.forEach((val, j) => {
        formData.append(`Options[${i}].values[${j}].valueName`, val.valueName);
      });
    });

    // Variants
    body.variants.forEach((variant, i) => {
      formData.append(`Variants[${i}].variantName`, variant.variantName);
      formData.append(`Variants[${i}].sku`, variant.sku);
      formData.append(`Variants[${i}].quantity`, variant.quantity.toString());
      formData.append(`Variants[${i}].price`, variant.price.toString());

      variant.optionAssignments.forEach((oa, j) => {
        formData.append(`Variants[${i}].optionAssignments[${j}].optionName`, oa.optionName);
        formData.append(`Variants[${i}].optionAssignments[${j}].optionValueName`, oa.optionValueName);
      });
      // variantImages (string array now)
      variant.variantImages?.forEach((img, k) => {
        formData.append(`Variants[${i}].variantImages[${k}]`, img);
      });
    });
    return this.http.put<APIResponse<ProductManagementItem>>(this.url + id, formData);
  }
  add(body: ProductManagementAdd, files: File[]) {
    const formData = new FormData();

    // Append files
    files.forEach((file) => {
      formData.append('ProductImages', file, file.name);
    });

    // ProductName, ProductDescription
    formData.append('ProductName', body.productName);
    formData.append('ProductDescription', body.productDescription);

    // CollectionIDs
    body.collectionIDs.forEach((id, i) => {
      formData.append(`CollectionIDs[${i}]`, id.toString());
    });

    // CategorieIDs
    body.categorieIDs.forEach((id, i) => {
      formData.append(`CategorieIDs[${i}]`, id.toString());
    });

    // Options
    body.options.forEach((opt, i) => {
      formData.append(`Options[${i}].optionName`, opt.optionName);

      opt.values.forEach((val, j) => {
        formData.append(`Options[${i}].values[${j}].valueName`, val.valueName);
      });
    });

    // Variants
    body.variants.forEach((variant, i) => {
      formData.append(`Variants[${i}].variantName`, variant.variantName);
      formData.append(`Variants[${i}].sku`, variant.sku);
      formData.append(`Variants[${i}].quantity`, variant.quantity.toString());
      formData.append(`Variants[${i}].price`, variant.price.toString());

      variant.optionAssignments.forEach((oa, j) => {
        formData.append(`Variants[${i}].optionAssignments[${j}].optionName`, oa.optionName);
        formData.append(`Variants[${i}].optionAssignments[${j}].optionValueName`, oa.optionValueName);
      });
      // variantImages (string array now)
      variant.variantImages?.forEach((img, k) => {
        formData.append(`Variants[${i}].variantImages[${k}]`, img);
      });
    });

    return this.http.post<APIResponse<ProductManagementItem>>(this.url, formData);
  }

  delete(id: number) {
    return this.http.delete<APIResponse<boolean>>(this.url + id);
  }
  changeStatus(id: number) {
    return this.http.put<APIResponse<boolean>>(this.url + 'status/' + id, {});
  }
}
