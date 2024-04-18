import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authType: 'login' | 'signup' = 'login';
  email: string = '';
  password: string = '';
  confirmedPassword = '';
  //selectedRole = 'User';
  emailError: boolean = false;
  passwordError: boolean = false;
  passwordConfirmedError: boolean = false;
  passwordMismatchError: boolean = false;
  errorMessage: string = '';
  selectedRole = 'client';

  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    
  }



  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8000/login/', loginData).subscribe(
      response => {
        if (response.token) {
          localStorage.setItem('token', response.token); 
          this.router.navigateByUrl('/');
        }
        console.log(response.message); 
      },
      error => {
        alert('User not found.');
        console.error('Error:', error.error.message); 
      }
    );
  }

  getCSRFToken(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/get-csrf-token/').pipe(
      tap(response => console.log('CSRF token:', response.csrfToken)),
      catchError(error => {
        console.error('Error fetching CSRF token:', error);
        return throwError(error);
      })
    );
  }
  

  onSignup(): void {
    if (!this.email) {
        this.emailError = true;
        return;
    }
    if (!this.password) {
        this.passwordError = true;
        return;
    }
    if (this.password !== this.confirmedPassword) {
        this.passwordMismatchError = true;
        return;
    }

    const userData = {
        email: this.email,
        password: this.password,
        userRole: 'client' 
    };
    console.log("User data", userData);
    this.http.post<any>('http://localhost:8000/api/register/', userData)
        .subscribe(
            response => {
                console.log("User data", userData);
                console.log('User registered successfully', response);
                this.authType = 'login';   
            },
            error => {
                console.error('Error registering user:', error);
                alert('Failed to register user. Please try again.');
                this.errorMessage = 'Failed to register user. Please try again.';
            }
        );
}


  onLogout() {
    localStorage.removeItem('jtoken');
    this.router.navigate(['/home-page']);

  }
  setAuthType(type: 'login' | 'signup') {
    this.authType = type;
    this.errorMessage = ''; 
  }
}

