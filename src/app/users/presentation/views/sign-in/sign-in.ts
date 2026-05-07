import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersApiService } from '../../../infrastructure/users-api.service';
import { UsersStore } from '../../../application/users.store';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignInComponent {
  // 1. Inyecciones (Siempre arriba del todo)
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private api = inject(UsersApiService);
  public store = inject(UsersStore);

  // 2. Propiedades
  signInForm: FormGroup;

  constructor() {
    // Inicializamos el formulario
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const request = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password
      };

      this.api.signIn(request).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          // Navegamos al dashboard que configuramos en las rutas
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error de login:', err);
          // El store ya maneja el error, pero aquí puedes poner un alert si quieres
        }
      });
    }
  }
}
