import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import { jwtDecode } from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + '/auth';

  constructor(private http: HttpClient,private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, { email, password });
  }

  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password?email=${encodeURIComponent(email)}`, {});
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword });
  }

  verifyOtp(otp: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseUrl}/verify-otp?otp=${otp}`,
      {},
      { observe: 'response' }
    );
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const decoded:any = jwtDecode(token);
      if (decoded && decoded.roles && decoded.roles.length > 0) {
        return decoded.roles[0]; // e.g. "ADMIN"
      }
      return null;
    } catch (error) {
      console.error('Token decode error', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  }

  getCurrentUserInfo() {
    return this.http.get<{ email: string, role: string }>(`${this.baseUrl}/me`);
  }
}
