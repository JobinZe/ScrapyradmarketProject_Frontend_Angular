import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from '../services/user-reg.services';
import { ActivatedRoute, Router } from '@angular/router';
import {Store} from '@ngrx/store';
import {setSession} from '../store/auth-action';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  logInForm!:FormGroup;
   message:string;
   alertType:string = 'success'
   showAlert:boolean=false
  constructor(private authService:UserRegistrationService,private fb:FormBuilder,private route:ActivatedRoute,
    private store:Store,
    private router:Router){
      const navigation = this.router.getCurrentNavigation();
      console.log(navigation,"nav><");
      
     this.message = navigation?.extras?.state?.['data']?.['msg']

      if(this.message){
        this.showAlert=true
      }

  }
  ngOnInit() {
  this.logInForm=this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  }
  logIn(){
    if(this.logInForm.invalid){
      this.logInForm.markAllAsTouched()
      return
    }
    const data=this.logInForm.getRawValue()
    this.authService.logInUserApi(data).subscribe((response)=>{
      let stringified = JSON.stringify(response)
      let parsed =JSON.parse(stringified)
      if(parsed.status == 1001){
        localStorage.setItem('token',parsed.token)
        this.authService.setSessionValue(response)
        this.store.dispatch(setSession({sessionData:response}))
        this.router.navigate(['/products/dashboard'])
      }
      else if(parsed.status == 1008){
       this.showAlert=true;
       this.alertType = 'danger'
       this.message = "Username does not exist"
      }
      else if(parsed.status == 1009){
        this.showAlert=true;
        this.alertType = 'danger'
        this.message = "Incorrect password"
      }
      else{
        console.log("failed");
        localStorage.removeItem('token')
      }
    })
  }
}
