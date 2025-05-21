import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token') || '';

      this.authService.isLoggedIn(token).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  errorMessage = '';

  onSubmit() {
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) return;

    const { email, password, username } = this.loginForm.value;

    this.authService.register({ email, username, password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
