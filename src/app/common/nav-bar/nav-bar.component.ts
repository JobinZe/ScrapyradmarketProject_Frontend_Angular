import { Component, OnInit } from '@angular/core';
import {UserRegistrationService} from '../../login/services/user-reg.services';
import {Store} from '@ngrx/store';
import {setSession} from '../../login/store/auth-action';
import {Router} from '@angular/router';
import {selectionSessionState} from '../../login/store/auth-selector';
import {map} from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone:false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  userSession!:any
  isLoggedIn:boolean=false
  selectedLang:any = 'en';
  constructor(private authServices:UserRegistrationService,private store:Store,private router:Router,private translate:TranslateService) {
  }
  ngOnInit() {
  }
  getSessionData():string | null{
   return this.authServices.getSessionValue()
  }
  setLang(lang:string){
   this.selectedLang = lang;
   this.translate.use(this.selectedLang)

  }
 
}
