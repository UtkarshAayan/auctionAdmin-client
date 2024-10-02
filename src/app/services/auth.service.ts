import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_id'); // Check if user_id exists
  }
  createSubadminService(userObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register-subadmin`, userObj);
  }
  sendEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, { email: email });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}resetPassword`, resetObj);
  }

}
