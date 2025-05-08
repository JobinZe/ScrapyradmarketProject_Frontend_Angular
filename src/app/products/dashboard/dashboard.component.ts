import {Component, inject, OnInit} from '@angular/core';
import {UserRegistrationService} from '../../login/services/user-reg.services';
import { Router } from '@angular/router';
import { ProductServices } from '../services/product services';
import { ProductModel } from '../models/product.model';
import { debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit {
     auth = inject(UserRegistrationService)
     productService=inject(ProductServices)
     product$=this.productService.productData
     searchValue!:string
     dataInsideBS!:ProductModel
     searchForm!:FormGroup
     productType$!:Observable<any[]>
     isSearchAdded:boolean=false
     constructor( private router:Router,private fb:FormBuilder) {
     this.searchForm = this.fb.group({
      searchController:[null]
     })
     }
    ngOnInit(): void {
      this.productService.fetchData().subscribe()
    }
    navigateToProduct(){
    this.router.navigateByUrl('products/add-product')
    }
   fetchFileType(id:number):Observable<string>{
   return this.product$.pipe(map((response:ProductModel)=>{
     return this.checkFileType(response.updatedProduct[id].image)
    }))
   }
   fetchFileTypeForSearch(prodArray:any[],id:number):Observable<string>{
   return of(this.checkFileType(prodArray[id]?.image))
    }
   checkFileType(file:string):string{
     const extention=file.split('.').pop()?.toLowerCase()
     if(!extention){
      return 'unknown'
     }
     let imgExtension=['jpeg','png','jpg']
     let docExtension=['pdf','xlsx']
     if(imgExtension.includes(extention)) return 'image';
     if(docExtension.includes(extention)) return 'document';
     return 'unknown'
   }
   bypassSecurity(file:string){    
     return this.productService.bypassSecurity(file)
   }
   checkKeyWord(){
    this.isSearchAdded=true
    this.productType$ = this.searchForm.get('searchController')!.valueChanges.pipe(
      startWith(this.searchForm.get('searchController')!.value),
      debounceTime(300),
        distinctUntilChanged(),
        switchMap(searchValue=>{
          return this.product$.pipe(map(response=>response.updatedProduct.filter((data:any)=>
            data.productName.replace(/"/g, '').toLowerCase().startsWith(searchValue.toLowerCase().trim())
            )
            ))
            }
            )
        )

      }
      
    
     
   
}
