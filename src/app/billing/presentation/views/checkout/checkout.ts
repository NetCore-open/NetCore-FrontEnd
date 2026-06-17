import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingStore } from '../../../application/billing.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  public store = inject(BillingStore);

  checkoutForm!: FormGroup;
  planId!: number;

  ngOnInit() {
    this.planId = Number(this.route.snapshot.paramMap.get('planId'));
    
    this.checkoutForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.store.processCheckout(this.planId, 1);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/admin/plans']);
  }
}
