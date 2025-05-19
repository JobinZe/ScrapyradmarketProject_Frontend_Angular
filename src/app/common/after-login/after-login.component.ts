import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserRegistrationService } from '../../login/services/user-reg.services';

@Component({
  selector: 'app-after-login',
  standalone:false,
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {
  cartItemCount:any = 2
  userName:any = 'user'
  showDropdown = false;

  constructor(private authServices:UserRegistrationService,private store:Store,private router:Router) {
  }
  ngOnInit() {

  }
  logOut(){
    this.authServices.logOut().subscribe(response=>{
      console.log(response)
    })
    }
}
