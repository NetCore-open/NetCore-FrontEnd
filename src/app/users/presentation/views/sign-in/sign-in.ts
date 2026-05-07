import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Importamos el comando desde tu capa de dominio
import { SignInCommand } from '../../../domain/model/sign-in.command';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html', // <-- Actualizado a tu nombre exacto
  styleUrl: './sign-in.css'      // <-- Actualizado a tu nombre exacto
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const command = new SignInCommand(
        this.signInForm.value.email,
        this.signInForm.value.password
      );

      console.log('Comando listo de CleanWave:', command);
    }
  }
}
