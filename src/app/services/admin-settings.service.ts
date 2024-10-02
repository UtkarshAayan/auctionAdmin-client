import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { apiUrls } from '../api.urls'

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  private apiUrl = 'http://localhost:3000/api/categories';
  constructor(private http: HttpClient) { }

  getSettings(): Observable<any> {
    return this.http.get<any>(`${apiUrls.adminSettingsApi}/settings`);
  }

  updateBuyersPremium(buyerPremium: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/adminSettings/buyerPremium`, buyerPremium);
  }

  updateSalesTax(saleTax: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/adminSettings/saleTax`, saleTax);
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
    return this.http.post<any>(`http://localhost:3000/api/help/content`, helpContent);
  }
  getAllHelpContents(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/help/contents`);
  }

  updateHelpContent(id: string, helpContent: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/help/content/${id}`, helpContent);
  }

  deleteHelpContent(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/help/content/${id}`);
  }
  //howtosell
  createContentSell(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/sell/how-to-sell`, data);
  }

  getContentsSell(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/sell/how-to-sell`);
  }

  updateContentSell(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/sell/how-to-sell/${id}`, data);
  }

  deleteContentSell(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/sell/how-to-sell/${id}`);
  }
  //howtobuy
  createContentBuy(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/buy/how-to-buy`, data);
  }

  getContentsBuy(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/buy/how-to-buy`);
  }

  updateContentBuy(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/buy/how-to-buy/${id}`, data);
  }

  deleteContentBuy(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/buy/how-to-buy/${id}`);
  }

  //request

  // getRequest(): Observable<any> {
  //   return this.http.get<any>(`http://localhost:3000/api/request/all`);
  // }

  getRequest(page: number, limit: number, status: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<any>(`http://localhost:3000/api/request/all`, { params });
  }
  getRequestByIdService(id: any) {
    return this.http.get(`http://localhost:3000/api/request/${id}`)
  }
  deleteRequest(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/request/${id}`);
  }

  updateRequest(data: any, id: any) {
    return this.http.patch(`http://localhost:3000/api/request/${id}/status`, data)
  }

  //termsandconditions
  createTerms(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/terms/create`, data);
  }

  getTerms(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/terms`);
  }

  updateTerms(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/terms/${id}`, data);
  }

  deleteTerms(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/terms/${id}`);
  }
//about

//termsandconditions
createAbout(data: any): Observable<any> {
  return this.http.post(`http://localhost:3000/api/about/create`, data);
}

getAbout(): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/api/about`);
}

updateAbout(id: string, data: any): Observable<any> {
  return this.http.put(`http://localhost:3000/api/about/${id}`, data);
}

deleteAbout(id: string): Observable<any> {
  return this.http.delete(`http://localhost:3000/api/about/${id}`);
}

  //privacypolicy
  createPrivacy(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/privacy/create`, data);
  }

  getPrivacy(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/privacy`);
  }

  updatePrivacy(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/privacy/${id}`, data);
  }

  deletePrivacy(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/privacy/${id}`);
  }

  //create county
  createCountry(productData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/country/create`, productData);
  }
  //getcountrys
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/country/all`);
  }

  getCountryById(id: any) {
    return this.http.get(`http://localhost:3000/api/country/${id}`)
  }
  updateCountry(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/country/${id}`, data);
  }

  deleteCountry(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/country/${id}`);
  }


  uploadBannerImages(formData: FormData) {
    return this.http.post(`http://localhost:3000/api/banner/upload`, formData);
  }

  // Fetch Banner Images
  getBannerImages() {
    return this.http.get<{ bannerImages: string[] }>(`http://localhost:3000/api/banner/view`);
  }

  // Delete a Banner Image
  deleteBannerImage(fileName: string) {
    return this.http.delete(`http://localhost:3000/api/banner/delete/${encodeURIComponent(fileName)}`);
  }
}
