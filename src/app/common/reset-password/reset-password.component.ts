import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordService } from '../services/reset-password-services';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone:false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
    resetPasswordForm!:FormGroup
    token:any
   constructor(private fb:FormBuilder,private resetService:ResetPasswordService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.token = param.get('token');
      console.log(this.token,"token");
      
    })
   this.resetPasswordForm = this.fb.group({
    newPassword:[null],
    confirmPassword:[null]
   })
  }
  resetPassword(){
    const obj = this.resetPasswordForm.getRawValue()
    this.resetService.resetPassword(obj,this.token).subscribe((response:any)=>{
     let res = response;
     if(res.status==1027){
      // let msg = {
      //   message: "Password changes successfully",
      //   showAlert:true,
      //   alertType:"success"
      // }
      const ne:NavigationExtras = {state:{data:{msg:"Password changes successfully"}}}
      this.router.navigate(['/login'],ne)
     }
    },(error:HttpErrorResponse)=>{
      if(error.status == 400 ){
        const ne:NavigationExtras = {state:{data:{msg:"Token Expired.Please try again"}}}
        this.router.navigate(['/login'],ne)
      }
    }
      
      
    
    )
  }
}
