import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from '../login/services/loader.services';
@Injectable({
  providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor{
  constructor(private router:Router,private loaderService:LoaderService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader()
    const token = localStorage.getItem('token')
    if(token){
    const clonedReq =  req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }        
      })
      return next.handle(clonedReq).pipe(
        finalize(()=>
        this.loaderService.hideLoader()
        )
      )

    }
    return next.handle(req).pipe(

      catchError((error:HttpErrorResponse)=>{
        if(!navigator.onLine){
          this.router.navigate(['/common/offline'])
        }
        else if(error.status==0){
          this.router.navigate(['/common/error'])
        }
      return throwError(error)
      }),
      finalize(()=>
      this.loaderService.hideLoader())
    )
  }
  
}