import { Component,OnInit } from '@angular/core';
import { PaymentServices } from '../services/payment-services';

@Component({
  selector: 'app-payment-success',
  standalone:false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit{
  fetchPaymentDetail:any
  constructor(private paymentService:PaymentServices){}
  ngOnInit(): void {
    this.paymentService.fetchPaymentDetail().subscribe((res:any)=>{
      this.fetchPaymentDetail=res.obj;
      console.log(this.fetchPaymentDetail);
      
    })
  }

}
