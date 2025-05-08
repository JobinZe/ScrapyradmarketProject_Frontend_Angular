import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectionSessionState } from './login/store/auth-selector';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store:Store){}
  isLoggedIn:boolean=false
  ngOnInit(): void {
    this.store.select(selectionSessionState).subscribe(response=>{
     let parsed = typeof response == 'string' ? JSON.parse(response) : response
     console.log(parsed);
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
