import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignUpCommand } from '../../../domain/model/sign-up.command';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Importamos RouterLink para navegar
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''] // El teléfono lo dejamos opcional
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const command = new SignUpCommand(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.firstName,
        this.signUpForm.value.lastName,
        this.signUpForm.value.phone
      );

      console.log('Nuevo usuario listo para registrar:', command);
    }
  }
}
