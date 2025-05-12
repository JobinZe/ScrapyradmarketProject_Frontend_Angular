import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../services/product services';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  objectId!:string
  productObj:any;
  fileTypes=['pdf','xlsx']
  imageType=['jpg','jpeg','png']
  constructor(private productService:ProductServices,private route:ActivatedRoute,private domSanitizer:DomSanitizer,private router:Router){}
  ngOnInit(): void {
   this.route.paramMap.pipe(map(res=>{
   return res.get('id')
  }
   )).subscribe((id)=>{
    this.objectId=id as string
   })
   
   this.productService.fetchDataById(this.objectId).subscribe(response=>{
    this.productObj=response 
   })
  }
  fetchFileType():string{
   let extension = this.productObj?.image.split('.').pop()
   if(this.imageType.includes(extension)) return 'image'
   if(this.fileTypes.includes(extension)) return 'document'
   return 'undefined'
  }
  bypasssSecurityUrl(){
  return this.domSanitizer.bypassSecurityTrustResourceUrl(this.productObj?.imageUrl)
  }
  navigateDashboard(){
    this.router.navigateByUrl('/products/dashboard')
  }
  navigateToBuyProduct(){
    this.router.navigateByUrl('/products/buy-product')

  }
}
