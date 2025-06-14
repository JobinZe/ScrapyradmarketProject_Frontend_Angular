import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserRegistrationService } from '../../login/services/user-reg.services';
import { selectionSessionState } from '../../login/store/auth-selector';
import { TranslateService } from '@ngx-translate/core';
import { CartCountService } from '../services/cart-count-services';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-after-login',
  standalone:false,
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {
  cartItemCount:any
  userName:any = 'user'
  showDropdown = false;
  userSession:any;
  selectedLang:any = 'en';

  constructor(private authServices:UserRegistrationService,private store:Store,private router:Router,private translate:TranslateService,public cartCountService:CartCountService) {
    this.store.select(selectionSessionState).subscribe((res)=>{
      if(typeof res == 'string'){
       this.userSession = JSON.parse(res)
      }
      else{
        this.userSession = res

      }
    }
    )
  }
  ngOnInit() {
   this.authServices.getCartCountData().subscribe((response:any)=>{
    this.cartItemCount = response.totalLength
    this.cartCountService.setCartCount(this.cartItemCount)
    debounceTime(500);
    this.fetchCartValue()
   })
   
  
  }
  fetchCartValue(){
    this.cartCountService.cartCount$.subscribe(response=>{
      console.log(response,">>>cart count");
      
     })
  }
  setLang(lang:string){
    this.selectedLang = lang;
    this.translate.use(this.selectedLang)
 
   }
  logOut(){
    this.authServices.logOut().subscribe(response=>{
      console.log(response)
    })
    }
}
