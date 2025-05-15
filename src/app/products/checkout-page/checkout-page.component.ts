import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CheckoutService } from '../services/checkout-services';

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
  checkoutDetails:any={}
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private checkoutService:CheckoutService,
    private router:Router){
      const navigation = this.router.getCurrentNavigation()
       this.message = navigation?.extras.state?.['data']?.['msg']
       this.showAlert = navigation?.extras.state?.['data']?.['showAlert']
       this.alertType = navigation?.extras.state?.['data']?.['alertType']
    }
  ngOnInit(): void {
   this.checkoutService.getCheckoutApi().subscribe((response:any)=>{
   this.checkoutDetails = response.fetchCheckout;
   })       

  }
}
