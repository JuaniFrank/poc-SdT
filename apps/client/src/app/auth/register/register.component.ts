import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>Registro</h2>
      <form #registerForm="ngForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" [(ngModel)]="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" [(ngModel)]="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" [(ngModel)]="password" required>
        </div>
        <button type="submit" [disabled]="!registerForm.form.valid">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión aquí</a></p>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    button {
      background-color: #28a745;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  onSubmit() {
    console.log('Registro:', { name: this.name, email: this.email });
  }
}
