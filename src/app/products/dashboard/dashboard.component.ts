import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {UserRegistrationService} from '../../login/services/user-reg.services';
import { Router } from '@angular/router';
import { ProductServices } from '../services/product services';
import { ProductModel } from '../models/product.model';
import { debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { selectionSessionState } from '../../login/store/auth-selector';


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
     userDetails:any
     showAlert:boolean=false
     alertType:string='success'
     message!:string
     @ViewChild('quantityField') quantityModal:any

     constructor( private router:Router,private fb:FormBuilder,private cartService:CartService,private modalService:NgbModal,
      private store:Store) {
        const navigation = this.router.getCurrentNavigation();      
      this.message = navigation?.extras?.state?.['data']?.['msg']
       if(this.message){
         this.showAlert=true
       }
     this.searchForm = this.fb.group({
      searchController:[null]
     })
     }
    ngOnInit(): void {
      this.fetchDataForDashboard()    
      this.fetchSession()  
      
    }

    fetchSession(){
      this.store.select(selectionSessionState)
      .subscribe(response=>{
        console.log(typeof response); // 'object' or 'string'
        if(typeof response == 'string'){
          let parsed = JSON.parse(response)
          this.userDetails = parsed
        }
        else{
          this.userDetails = response;

        }                
    })
    }
    fetchDataForDashboard(){
      this.productService.fetchData().subscribe()

    }
    navigateToProduct(){
    this.router.navigateByUrl('products/add-product')
    }
   fetchFileType(id:number):Observable<string>{
   return this.product$.pipe(map((response:ProductModel)=>{
     return this.checkFileType(response.updatedProduct[id]?.image)
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
    objectId:any  
    presentQuantity:any;
    goToCart(id:number){
      this.openQuanityModal()
      this.product$.subscribe((data:ProductModel)=>{
       this.objectId = data.updatedProduct[id]._id;
       this.presentQuantity = data.updatedProduct[id].quantity
     })
    }
  
     updateQuantity(){ 
     this.cartService.addToCatApi(this.objectId,this.valueForQuantity).subscribe(response=>{
      let stringified =JSON.stringify(response);
      let parsed = JSON.parse(stringified);
      this.modalService.dismissAll()
      if(parsed.status == 1016){
        this.showAlert=true;
        this.alertType = 'danger'
        this.message = "Not enough quantity available"
      }
      else if(parsed.status == 1014){
        this.router.navigate(['/products/buy-product'])
      }
     })
     }
    openQuanityModal(){
      this.modalService.open(this.quantityModal)
    }
    valueForQuantity:number = 1
    decrementButton(){
     if(this.valueForQuantity > 1){
      this.valueForQuantity--
      this.checkQuantityValidation()
     }
    }
    incrementQuantity(){
      if(this.valueForQuantity > 0){
        this.valueForQuantity++
        this.checkQuantityValidation()
      }
    }
    invalidQuantity:boolean=false;
    checkQuantityValidation(){
      if(this.valueForQuantity > this.presentQuantity){
        this.invalidQuantity=true
      }
      else{
        this.invalidQuantity=false;
      }
    }
    deleteProduct(i:number){
      this.productService.deleteProduct(i).subscribe(response=>{
        let stringified = JSON.stringify(response);
        let parsed =  JSON.parse(stringified);
        debounceTime(500);
        this.fetchDataForDashboard()
        if(parsed.status == 1022){
             this.message = "Product deleted successfuly";
             this.alertType="success";
             this.showAlert=true
        }
        else if(parsed.status == 1021){
          this.message = "Product not found";
          this.alertType="danger";
          this.showAlert=true
        }
        else{
          this.message = "Server error";
          this.alertType="danger";
          this.showAlert=true
        }
      })
    }
 
}
