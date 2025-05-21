import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { LoginDto } from "src/app/models/login.model";
import { RegisterDto } from "src/app/models/register.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(loginCredentials: LoginDto) {
    return this.http.post<{token: string}>('http://localhost:3000/auth/login', loginCredentials);
  }

  register(registerCredentials: RegisterDto) {
    return this.http.post<{token: string}>('http://localhost:3000/auth/register', registerCredentials);
  }

  isLoggedIn(token: string): Observable<boolean> {
    if (!token) {
      return of(false); 
    }

    return this.http
      .post<{ token: string }>('http://localhost:3000/auth/validate', { token })
      .pipe(
        map(() => true),
        catchError(() => of(false)) 
      );
  }

}