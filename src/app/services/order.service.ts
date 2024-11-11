import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient);

  getOrders(id: string): Observable<any>{
    return this.http.get<any>(`http://localhost:3001/api/orders/${id}`);
  }


  getAllOrders(page: number = 1, limit: number = 10, status: string = ''): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    if (status) {
      params = params.append('status', status);
    }
  
    return this.http.get<any>(`http://localhost:3001/api/orders`, { params });
  }
  
  
deleteOrder(id: string): Observable<any> {
  return this.http.delete<any>(`http://localhost:3001/api/orders/${id}`);
}

updateOrderStatus(orderId: string, status: string): Observable<any> {
  return this.http.patch(`http://localhost:3001/api/orders/update-status`, { orderId, status });
}

getTransactions(page: number, limit: number): Observable<any> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

  return this.http.get(`http://localhost:3001/api/transactions`, { params });
}

}
