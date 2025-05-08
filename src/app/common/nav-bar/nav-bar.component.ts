import { Component, OnInit } from '@angular/core';
import {UserRegistrationService} from '../../login/services/user-reg.services';
import {Store} from '@ngrx/store';
import {setSession} from '../../login/store/auth-action';
import {Router} from '@angular/router';
import {selectionSessionState} from '../../login/store/auth-selector';
import {map} from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone:false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  userSession!:any
  isLoggedIn:boolean=false
  constructor(private authServices:UserRegistrationService,private store:Store,private router:Router) {
  }
  ngOnInit() {

  }
  getSessionData():string | null{
   return this.authServices.getSessionValue()
  }
 
 
}
