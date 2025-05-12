import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServices } from '../services/product services';
import { debounceTime, map } from 'rxjs';
import { CartService } from '../services/cart-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('quantityField') quantityField:any
  constructor(private route:ActivatedRoute,private router:Router,private productService:ProductServices,
    private modalService:NgbModal,
    private cartService:CartService){}
  ngOnInit(): void {
   this.getCartDetails()
  }


  shipping = 5.99;
  taxRate = 0.08;

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
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
      else if(parsed.status == 1016){
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
 
}
