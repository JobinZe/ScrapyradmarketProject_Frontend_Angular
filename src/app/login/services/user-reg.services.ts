import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "../../../environment/environment-dev";
import {CookieService} from 'ngx-cookie-service';
import {removeSession, setSession} from '../store/auth-action';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
export const USER_AUTH='auth_user'
@Injectable({
    providedIn:"root"
})
export class UserRegistrationService{
    private serverUrl = environments.url
    // public userSessionData= new BehaviorSubject<UserSession>(this.getSessionValue())
    constructor(private http:HttpClient,private cookieService:CookieService,
                private store:Store,private router:Router) {}
regUserApi(data:any){
    return this.http.post(this.serverUrl + 'api/auth/register',data)
}
logInUserApi(data:any){
    return this.http.post(this.serverUrl + 'api/auth/login',data)
}
forgotPassword(email:string){
    return this.http.post(this.serverUrl + 'api/auth/forgot-password',email)
}
setSessionValue(value:any){
  window.sessionStorage.setItem(USER_AUTH,JSON.stringify(value))
}
getSessionValue(){
  return window.sessionStorage.getItem(USER_AUTH)
}
logOut(){
   this.logOutUser()
   return this.http.get(this.serverUrl + 'api/auth/logout')
}
logOutUser(){
 window.sessionStorage.removeItem(USER_AUTH);
 localStorage.removeItem('token')
  this.store.dispatch(removeSession())
  this.router.navigate((['/login']))
}

checkIfAuthenticated() : Promise<void>{
return new Promise((resolve,reject)=>{
  const token = localStorage.getItem('token')
  if(token){
   this.http.post(this.serverUrl + 'api/auth/authorization',null).subscribe(()=>{
     resolve()
     let value =  window.sessionStorage.getItem(USER_AUTH)
     this.store.dispatch(setSession({sessionData:value}))
    },()=>{
      localStorage.removeItem('token')
      window.sessionStorage.removeItem(USER_AUTH)
      this.router.navigate(['/common/session-expired'])
      window.location.reload()
      reject()
    })
  }
  else{
    resolve()
  }
})
}
}
