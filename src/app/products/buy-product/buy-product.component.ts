import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductServices } from '../services/product services';
import { Observable, debounceTime, map, of } from 'rxjs';
import { CartService } from '../services/cart-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fetchFileType } from '../services/file-validator';
import { CheckoutService } from '../services/checkout-services';
import { CartCountService } from '../../common/services/cart-count-services';
import { UserRegistrationService } from '../../login/services/user-reg.services';
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
@Component({
  selector: 'app-buy-product',
  standalone:false,
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.scss'
})

export class BuyProductComponent implements OnInit{
  product:any;
  cartItems:any[]=[]
  cartItemCount:any
  @ViewChild('quantityField') quantityField:any
  constructor(private router:Router,
    private productService:ProductServices,
    private modalService:NgbModal,
    private cartService:CartService,
    private cartCountService:CartCountService,
    private authServices:UserRegistrationService,
    private checkoutService:CheckoutService){}
  ngOnInit(): void {
   this.getCartDetails()
   this.authServices.getCartCountData().subscribe((response:any)=>{
    this.cartItemCount = response.totalLength
    this.cartCountService.setCartCount(this.cartItemCount)
   })
  }


  shipping = 5.99;
  taxRate = 0.08;

  get subtotal(): number {
     return this.cartItems.reduce((sum,item)=>sum + (item.price * item.quantity),0)
  }

  get tax(): number {        
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    return this.subtotal + this.shipping + this.tax;
  }
  intialValue:number = 1;
  invalidQuantity:boolean=false
  increaseQuantity(): void {    
    if(!this.invalidQuantity ){
      this.intialValue++
    }
    this.checkForInvalidQuantity()
  }

  decreaseQuantity(): void {
    if(this.intialValue > 1){
      this.intialValue--
    }
    this.checkForInvalidQuantity()
  }
checkForInvalidQuantity(){
if(this.intialValue > this.presentQuantity){
  this.invalidQuantity=true
}
else{
  this.invalidQuantity=false

}
}

 
  navigateToProductDetail(){
   this.router.navigate(['/products/dashboard'])
  }

  getCartDetails(){
    this.cartService.getCart().subscribe(response=>{
      let data = JSON.stringify(response);
      let parsed  = JSON.parse(data)
      if(parsed.status == 1015){
        this.cartItems = []
      }
       if(parsed.status == 1016){
        this.cartItems = parsed?.cartItems    
      }
    })
  }
  showAlert:boolean=false;
  alertType!:string;
  message!:string
  removeFromCart(){
     this.cartService.removeFromCart(this.presentObjectId,this.intialValue).subscribe(response=>{
       let stringified = JSON.stringify(response);
       let parsed = JSON.parse(stringified);
       this.modalService.dismissAll()
       if(parsed.status == 1020){
        this.showAlert=true;
        this.alertType = 'success'
        this.message = "Product removed sucessfully"
       }
       else if(parsed.status == 1018){
        this.showAlert=true;
        this.alertType = 'success'
        this.message = "No cart items found"
       }
       else{
        this.showAlert=true;
        this.alertType = 'success'
        this.message = "Server Error"
       }
     })
    debounceTime(500);
     this.getCartDetails()
  }
  presentQuantity!:number
  presentObjectId!:string
  openRemovePopup(id:number){
    this.modalService.open(this.quantityField)
    this.presentQuantity = this.cartItems[id].quantity
    this.presentObjectId = this.cartItems[id]._id
  }
  fetchFileType(image:any):Observable<string>{
  
    return of(fetchFileType(image))
     }
     bypassSecurity(file:string){    
      console.log(file,"file")
      return this.productService.bypassSecurity(file)
    }
  submitCheckOut(){
    let data = {
      subtotal:this.subtotal,
      shipping:this.shipping,
      tax:this.tax,
      totalAmount:this.total
    }
    this.checkoutService.checkOutApi(data).subscribe((response:any)=>{
      if(response.status==1024){
        const navigationExtras:NavigationExtras = {state:{data:{msg:"Price saved to checkout",
        showAlert:true,
       alertType:"success"}}}
        this.router.navigate(['/products/checkout'],navigationExtras)
      }
    })
  }
}
