import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistrationService } from '../../login/services/user-reg.services';

@Component({
  selector: 'app-forgot-password',
  standalone:false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm!:FormGroup
  message:string;
  showAlert:boolean=false;
  alertType!:string
  constructor(private authService:UserRegistrationService,private fb:FormBuilder,private route:ActivatedRoute,
    private router:Router){
      const navigation = this.router.getCurrentNavigation();
     this.message = navigation?.extras?.state?.['data']?.['msg']
      console.log(navigation?.extras?.state?.['data']?.['msg']);
      if(this.message){
        this.showAlert=true
      }
      
  }
  ngOnInit() {
    this.forgotPasswordForm=this.fb.group({
      email:['',[Validators.required]],
    })
    
    }

    sendEmail(){
      this.forgotPasswordForm.markAllAsTouched()
      if(this.forgotPasswordForm.invalid){return}
      this.authService.forgotPassword(this.forgotPasswordForm.getRawValue())
      .subscribe(response=>{
       let stringified=JSON.stringify(response);
       let parsed = JSON.parse(stringified);
       if(parsed.status == 1004){
        this.showAlert=true;
        this.message='Rest link has been sent to your entered email'
        this.alertType='success'
       }
       else if(parsed.status == 1003){
        this.showAlert=true;
        this.message=parsed.message
        this.alertType='danger'
       }
       else{
        this.showAlert=true;
        this.message=parsed.message
        this.alertType='Please try again'
       }
      })
    }
}
