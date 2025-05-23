import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectionSessionState } from './login/store/auth-selector';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store:Store,private translate: TranslateService){
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('en')
    translate.use('en');
  }
  isLoggedIn:boolean=false
  ngOnInit(): void {
    this.store.select(selectionSessionState).subscribe(response=>{
     let parsed = typeof response == 'string' ? JSON.parse(response) : response
     if(response == null || Object.keys(parsed)?.length > 1 ){
      this.isLoggedIn = true
     }
     else{
      this.isLoggedIn = false
     }
    })
  }
  title = 'angular_19';
}
