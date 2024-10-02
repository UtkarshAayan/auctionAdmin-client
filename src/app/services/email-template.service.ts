import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {apiUrls} from '../api.urls'

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(private http: HttpClient) { }

   // Get all email templates
   getTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrls.emailTemplateAPI}`);
  }

  // Get a specific email template by ID
  getTemplateById(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrls.emailTemplateAPI}/${id}`);
  }

  // Create a new email template
  createTemplate(template: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.emailTemplateAPI}`, template);
  }

  // Update an existing email template by ID
  updateTemplate(id: string, template: any): Observable<any> {
    return this.http.put<any>(`${apiUrls.emailTemplateAPI}/${id}`, template);
  }

  // Delete an email template by ID
  deleteTemplate(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrls.emailTemplateAPI}/${id}`);
  }
}
