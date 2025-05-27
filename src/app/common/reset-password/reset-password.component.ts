import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../services/reset-password-services';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { passwordValidity } from '../services/checkPassword-validity';

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
    newPassword:[null,[Validators.required]],
    confirmPassword:[null,[Validators.required]]
   })
  }
  weakPassword:boolean=false;
  mediumPasswrd:boolean=false;
  strongPassword:boolean=false
  checkPassswordLength(){
    this.resetPasswordForm.get('newPassword')?.valueChanges.subscribe(response=>{
      console.log(response.length);
      
     if(response.length < 3){
      this.weakPassword=true;
      this.mediumPasswrd=false;
      this.strongPassword=false;
     }      
     else if(response.length > 3 && response.length < 6){
      this.weakPassword=false;
      this.mediumPasswrd=true;
      this.strongPassword=false;
     }
     else if(response.length > 6){
      this.weakPassword=false;
      this.mediumPasswrd=false;
      this.strongPassword=true;
     }
    })
  }
  triggerPasswordUniquness(){
    passwordValidity(this.resetPasswordForm)
  }
  showConformPassword:boolean=false
  showPasswordToggle(){
    this.showConformPassword=!this.showConformPassword
  }
  showNewPassword:boolean=false
  showNewPasswordToggle(){
    this.showNewPassword=!this.showNewPassword
  }
  resetPassword(){
    if(this.resetPasswordForm.invalid){
      this.resetPasswordForm.markAllAsTouched()
      return
    }
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
      if(error.status == 400 ||error.status == 401 ){
        const ne:NavigationExtras = {state:{data:{msg:"Token Expired.Please try again"}}}
        this.router.navigate(['/login'],ne)
      }
    }
      
      
    
    )
  }
}
