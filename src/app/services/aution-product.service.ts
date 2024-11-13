import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutionProductService {

  http = inject(HttpClient);
  // getAllAuctionService() {
  //   return this.http.get(`${apiUrls.auctionProduct}`)
  // }
  getAllAuctionService(page: number, limit: number, search?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${apiUrls.auctionProduct}`, { params });
  }

  getAuctionByIdService(id:any){
    return this.http.get(`https://admin.menaauctions.com/api/product/${id}`)
  }

  verifyAuctionByAdminService(productId: any): Observable<any> {
    const url = `https://admin.menaauctions.com/api/admin/verify-product/${productId}`;
    return this.http.post(url, {});
  }

  updateAuctionService(data: any, id: any) {
    return this.http.put(`https://admin.menaauctions.com/api/product/${id}`, data)
  }
  deleteAuctionService(id: any) {
    return this.http.delete(`https://admin.menaauctions.com/api/product/${id}`)
  }
   



}    
