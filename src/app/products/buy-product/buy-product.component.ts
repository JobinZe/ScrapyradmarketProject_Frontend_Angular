import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServices } from '../services/product services';
import { map } from 'rxjs';
import { CartService } from '../services/cart-service';
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
  scrapId!:string
  product:any;
  cartItems:any[]=[]
  constructor(private route:ActivatedRoute,private router:Router,private productService:ProductServices,
    private cartService:CartService){}
  ngOnInit(): void {
  this.route.paramMap.pipe(map(res=>res.get('id'))).subscribe(res=>this.scrapId = res as string)
   this.getCartDetails()
  }


  shipping = 5.99;
  taxRate = 0.08;

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get tax(): number {
    console.log(this.subtotal, this.taxRate,this.subtotal * this.taxRate);
    
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    return this.subtotal + this.shipping + this.tax;
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }
 
  navigateToProductDetail(){
   this.router.navigate(['/products/product-detail',this.scrapId])
  }

  getCartDetails(){
    this.cartService.getCart().subscribe(response=>{
      let data = JSON.stringify(response);
      let parsed  = JSON.parse(data)
      this.cartItems = parsed?.cartItems
      console.log(this.cartItems,"cart");
    
    })
  }
  calculateProductQuantity(){
    
  }
}
