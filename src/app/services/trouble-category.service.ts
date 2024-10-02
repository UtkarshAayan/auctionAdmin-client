import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
@Injectable({
  providedIn: 'root'
})
export class TroubleCategoryService {

  http = inject(HttpClient);

  createCategoryService(categoryObj:any){
    return this.http.post<any>(`${apiUrls.troubleCategory}add`,categoryObj);
  }
  getAllCategoryService() {
    return this.http.get(`${apiUrls.troubleCategory}getAll`)
  }
}
