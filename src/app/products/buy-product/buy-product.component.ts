import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buy-product',
  standalone:false,
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{
  scrapId!:string | null
  product:any[]=[]
  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
  this.route.paramMap.subscribe(res=>this.scrapId = res.get('id')
  )
  }
  navigateToProductDetail(){
   this.router.navigate(['/products/product-detail',this.scrapId])
  }
}
