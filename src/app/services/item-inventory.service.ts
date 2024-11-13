import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
@Injectable({
  providedIn: 'root'
})
export class ItemInventoryService {

  http = inject(HttpClient);

  createItemService(itemObj:any){
    return this.http.post<any>(`${apiUrls.itemInventoryApi}addItem`,itemObj);
  }
  getAllItemsService() {
    return this.http.get(`${apiUrls.itemInventoryApi}getItems`)
  }

  deleteItemService(id: any) {
    return this.http.delete(`http://88.222.212.120:3001/api/item/${id}`)
  }
   
  getItemByIdService(id:any){
    return this.http.get(`http://88.222.212.120:3001/api/item/${id}`)
  }

}
