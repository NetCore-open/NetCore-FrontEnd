import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 1. Usamos el nombre de archivo 'users.store' que se ve en tu imagen
import { UsersStore } from '../../../application/users.store';
import { SignInCommand } from '../../../domain/model/sign-in.command';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignInComponent {
  private fb = inject(FormBuilder);

  // 2. Inyectamos el Store (Asegúrate de que la clase dentro del archivo se llame UsersStore)
  public store = inject(UsersStore);

  signInForm: FormGroup;

  constructor() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const command: SignInCommand = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password
      };

      // 3. Llamamos al método del store
      this.store.signIn(command);
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
