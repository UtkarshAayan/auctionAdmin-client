import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient);

  createUserService(userObj:any){
    return this.http.post<any>(`${apiUrls.userServiceApi}register`,userObj);
  }
  // getAllUsersService() {
  //   return this.http.get(`${apiUrls.userServiceApi}`)
  // }

  getAllUsersService(page: number, limit: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);

    return this.http.get<any>(`${apiUrls.userServiceApi}`, { params });
  }

  //seller
  getAllSellersService(page: number, limit: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);

    return this.http.get<any>(`${apiUrls.userServiceApi}sellers`, { params });
  }
  //buyer
  getAllBuyersService(page: number, limit: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);

    return this.http.get<any>(`${apiUrls.userServiceApi}buyers`, { params });
  }
  //subadmin
  getAllSubAdminsService(page: number, limit: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search);

    return this.http.get<any>(`${apiUrls.userServiceApi}subadmins`, { params });
  }
  updateUserService(data: any, id: any) {
    return this.http.put(`https://admin.menaauctions.com/api/user/${id}`, data)
  }
  deleteUserService(id: any) {
    return this.http.delete(`https://admin.menaauctions.com/api/user/${id}`)
  }
   
  getUserByIdService(id:any){
    return this.http.get(`https://admin.menaauctions.com/api/user/${id}`)
  }

  verifyUserByAdminService(productId: any): Observable<any> {
    const url = `https://admin.menaauctions.com/api/admin/verify/${productId}`;
    return this.http.put(url, {});
  }


}
