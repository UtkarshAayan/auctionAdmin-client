import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { apiUrls } from '../api.urls'

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  private apiUrl = 'https://admin.menaauctions.com/api/categories';
  constructor(private http: HttpClient) { }

  getSettings(): Observable<any> {
    return this.http.get<any>(`${apiUrls.adminSettingsApi}/settings`);
  }

  updateBuyersPremium(buyerPremium: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/adminSettings/buyerPremium`, buyerPremium);
  }

  updateSalesTax(saleTax: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/adminSettings/saleTax`, saleTax);
  }
  //Category
  createCategory(categoryData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, categoryData).pipe(
      catchError(this.handleError)
    );
  }

  // Get all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing category
  updateCategory(categoryId: string, categoryData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}`, categoryData).pipe(
      tap(response => console.log('Update Response:', response)), // Log the response
      catchError(this.handleError)
    );
  }

  // Delete a category
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a subcategory
  deleteSubcategory(categoryId: string, subcategoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}/subcategories/${subcategoryId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  //HelpContent
  createHelpContent(helpContent: any): Observable<any> {
    return this.http.post<any>(`https://admin.menaauctions.com/api/help/content`, helpContent);
  }
  getAllHelpContents(): Observable<any> {
    return this.http.get<any>(`https://admin.menaauctions.com/api/help/contents`);
  }

  updateHelpContent(id: string, helpContent: any): Observable<any> {
    return this.http.put<any>(`https://admin.menaauctions.com/api/help/content/${id}`, helpContent);
  }

  deleteHelpContent(id: string): Observable<any> {
    return this.http.delete<any>(`https://admin.menaauctions.com/api/help/content/${id}`);
  }
  //howtosell
  createContentSell(data: any): Observable<any> {
    return this.http.post(`https://admin.menaauctions.com/api/sell/how-to-sell`, data);
  }

  getContentsSell(): Observable<any> {
    return this.http.get<any>(`https://admin.menaauctions.com/api/sell/how-to-sell`);
  }

  updateContentSell(id: string, data: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/sell/how-to-sell/${id}`, data);
  }

  deleteContentSell(id: string): Observable<any> {
    return this.http.delete(`https://admin.menaauctions.com/api/sell/how-to-sell/${id}`);
  }
  //howtobuy
  createContentBuy(data: any): Observable<any> {
    return this.http.post(`https://admin.menaauctions.com/api/buy/how-to-buy`, data);
  }

  getContentsBuy(): Observable<any> {
    return this.http.get<any>(`https://admin.menaauctions.com/api/buy/how-to-buy`);
  }

  updateContentBuy(id: string, data: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/buy/how-to-buy/${id}`, data);
  }

  deleteContentBuy(id: string): Observable<any> {
    return this.http.delete(`https://admin.menaauctions.com/api/buy/how-to-buy/${id}`);
  }

  //request

  // getRequest(): Observable<any> {
  //   return this.http.get<any>(`https://admin.menaauctions.com/api/request/all`);
  // }

  getRequest(page: number, limit: number, status: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<any>(`https://admin.menaauctions.com/api/request/all`, { params });
  }
  getRequestByIdService(id: any) {
    return this.http.get(`https://admin.menaauctions.com/api/request/${id}`)
  }
  deleteRequest(id: string): Observable<any> {
    return this.http.delete(`https://admin.menaauctions.com/api/request/${id}`);
  }

  updateRequest(data: any, id: any) {
    return this.http.patch(`https://admin.menaauctions.com/api/request/${id}/status`, data)
  }

  //termsandconditions
  createTerms(data: any): Observable<any> {
    return this.http.post(`https://admin.menaauctions.com/api/terms/create`, data);
  }

  getTerms(): Observable<any> {
    return this.http.get<any>(`https://admin.menaauctions.com/api/terms`);
  }

  updateTerms(id: string, data: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/terms/${id}`, data);
  }

  deleteTerms(id: string): Observable<any> {
    return this.http.delete(`https://admin.menaauctions.com/api/terms/${id}`);
  }
//about

//termsandconditions
createAbout(data: any): Observable<any> {
  return this.http.post(`https://admin.menaauctions.com/api/about/create`, data);
}

getAbout(): Observable<any> {
  return this.http.get<any>(`https://admin.menaauctions.com/api/about`);
}

updateAbout(id: string, data: any): Observable<any> {
  return this.http.put(`https://admin.menaauctions.com/api/about/${id}`, data);
}

deleteAbout(id: string): Observable<any> {
  return this.http.delete(`https://admin.menaauctions.com/api/about/${id}`);
}

  //privacypolicy
  createPrivacy(data: any): Observable<any> {
    return this.http.post(`https://admin.menaauctions.com/api/privacy/create`, data);
  }

  getPrivacy(): Observable<any> {
    return this.http.get<any>(`https://admin.menaauctions.com/api/privacy`);
  }

  updatePrivacy(id: string, data: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/privacy/${id}`, data);
  }

  deletePrivacy(id: string): Observable<any> {
    return this.http.delete(`https://admin.menaauctions.com/api/privacy/${id}`);
  }

  //create county
  createCountry(productData: any): Observable<any> {
    return this.http.post<any>(`https://admin.menaauctions.com/api/country/create`, productData);
  }
  //getcountrys
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`https://admin.menaauctions.com/api/country/all`);
  }

  getCountryById(id: any) {
    return this.http.get(`https://admin.menaauctions.com/api/country/${id}`)
  }
  updateCountry(id: string, data: any): Observable<any> {
    return this.http.put(`https://admin.menaauctions.com/api/country/${id}`, data);
  }

  deleteCountry(id: string): Observable<any> {
    return this.http.delete(`https://admin.menaauctions.com/api/country/${id}`);
  }


  uploadBannerImages(formData: FormData) {
    return this.http.post(`https://admin.menaauctions.com/api/banner/upload`, formData);
  }

  // Fetch Banner Images
  getBannerImages() {
    return this.http.get<{ bannerImages: string[] }>(`https://admin.menaauctions.com/api/banner/view`);
  }

  // Delete a Banner Image
  deleteBannerImage(fileName: string) {
    return this.http.delete(`https://admin.menaauctions.com/api/banner/delete/${encodeURIComponent(fileName)}`);
  }
}
