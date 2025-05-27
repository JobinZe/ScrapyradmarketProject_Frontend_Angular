import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CheckoutService } from '../services/checkout-services';
import { PaymentServices } from '../services/payment-services';
import { UserRegistrationService } from '../../login/services/user-reg.services';

@Component({
  selector: 'app-checkout-page',
  standalone:false,
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{
  showAlert:boolean=false;
  alertType!:string
  message!:string;
  paymentForm!:FormGroup;
  checkoutDetails:any={}
  cartItemCount:any
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private checkoutService:CheckoutService,private authServices:UserRegistrationService,
    private router:Router,private paymentServices:PaymentServices){
      const navigation = this.router.getCurrentNavigation()
       this.message = navigation?.extras.state?.['data']?.['msg']
       this.showAlert = navigation?.extras.state?.['data']?.['showAlert']
       this.alertType = navigation?.extras.state?.['data']?.['alertType']
    }
  ngOnInit(): void {
   this.checkoutService.getCheckoutApi().subscribe((response:any)=>{
   this.checkoutDetails = response.fetchCheckout;

   }) 
   this.authServices.getCartCountData().subscribe((response:any)=>{
    this.cartItemCount = response.totalLength
   })
   this.paymentForm = this.fb.group({
    fullName:[null,[Validators.required]],
    emailAddress:[null,[Validators.required]],
    streetAddress:[null,[Validators.required]],
    city:[null,[Validators.required]],
    zipCode:[null,[Validators.required]],
    paymentMethod:[null,[Validators.required]],
    cardHolder:[null],
    cardNumber:[null],
    expiryDate:[null],
    cvv:[null,[Validators.pattern('^[0-9]*$')]],
   })      

  }
  conditionalCheck(){
    if(this.paymentForm.get('paymentMethod')?.value == 1){
      this.paymentForm.get('cardHolder')?.setValidators([Validators.required])
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required])
      this.paymentForm.get('expiryDate')?.setValidators([Validators.required])
      this.paymentForm.get('cvv')?.setValidators([Validators.required,Validators.maxLength(3)])
      this.paymentForm.get('cardHolder')?.updateValueAndValidity()
      this.paymentForm.get('cardNumber')?.updateValueAndValidity()
      this.paymentForm.get('expiryDate')?.updateValueAndValidity()
      this.paymentForm.get('cvv')?.updateValueAndValidity()
    }
    else{
      this.paymentForm.get('cardHolder')?.clearValidators()
      this.paymentForm.get('cardNumber')?.clearValidators()
      this.paymentForm.get('expiryDate')?.clearValidators()
      this.paymentForm.get('cvv')?.clearValidators()

      this.paymentForm.get('cardHolder')?.updateValueAndValidity()
      this.paymentForm.get('cardNumber')?.updateValueAndValidity()
      this.paymentForm.get('expiryDate')?.updateValueAndValidity()
      this.paymentForm.get('cvv')?.updateValueAndValidity()
    }
  }
  selectedMethod!:string
  setValueforPM(recievedValue:string){
   this.selectedMethod = recievedValue;
   if(this.selectedMethod == 'card'){
    this.paymentForm.get('paymentMethod')?.patchValue(1);
   }
   else{
    this.paymentForm.get('paymentMethod')?.patchValue(2);
   }
   this.conditionalCheck()

  }
  submitPayment(){
    if(this.paymentForm.invalid){
      this.paymentForm.markAllAsTouched()
     return
    }
    let obj = this.paymentForm.getRawValue()
    this.paymentServices.addPaymentDetails(obj).subscribe((response:any)=>{
    if(response.status == 1024){
      this.router.navigate(['/products/payment-success'])
    }
    else{
      this.showAlert=true;
      this.alertType='danger';
      this.message="Server Error"
    }
    }
    )
  }
}
