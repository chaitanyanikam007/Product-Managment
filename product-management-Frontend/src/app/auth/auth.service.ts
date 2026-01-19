import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data)
      .pipe(
        tap(res => localStorage.setItem('token', res.token))
      );
  }
  saveToken(token: string) {
  localStorage.setItem('token', token);
}


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
