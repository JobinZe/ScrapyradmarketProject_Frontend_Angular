import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../services/user-reg.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone:false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  userRegForm!:FormGroup;
  showAlert:boolean=false;
  msgType!:string;
  message!:string
  constructor(private authService:UserRegistrationService,private fb:FormBuilder,private router:Router){}
  ngOnInit() {
  this.userRegForm=this.fb.group({
    email:['',[Validators.required]],
    userName:['',[Validators.required]],
    gender:['',[Validators.required]],
    type:['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(5)]]
  })
  }
  checkField(){
    console.log(this.userRegForm.get('password'));
    
  }
signUp(){
  this.userRegForm.markAllAsTouched()
  if(this.userRegForm.invalid){
    return
  }
  const data=this.userRegForm.getRawValue()
  this.authService.regUserApi(data).subscribe(response=>{
    let stringified = JSON.stringify(response)
    let parsed =JSON.parse(stringified)
    if(parsed.status == 1000){
      console.log("Registration Successfull");
      let msg="Registration Successfull"
      const navigationExtras:NavigationExtras={state:{data:{msg:msg}}}
      this.router.navigate(['/login'],navigationExtras)
    }
    else if(parsed.status == 1006) {
      this.showAlert=true;
      this.msgType='danger';
      this.message="Username or EmailId is already registered"
    }
    else{
      this.message="Server Error"
      this.showAlert=true;
      this.msgType='danger'
    }
  },(err)=>{
    let error = err.error.status
    if(error==1006){
      this.message="Username or email Id is already registered.Please try with a unique username and emailId"
      this.showAlert=true;
      this.msgType='danger'
    }    
  })
}
}
