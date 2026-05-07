import { Routes } from '@angular/router';
import { SignInComponent } from './users/presentation/views/sign-in/sign-in';
import { SignUpComponent } from './users/presentation/views/sign-up/sign-up';


export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
