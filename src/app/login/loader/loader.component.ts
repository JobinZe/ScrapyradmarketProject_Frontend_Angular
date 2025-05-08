import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.services';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading:boolean=false
  constructor(private loaderService:LoaderService){
   this.loaderService.loaderStatus.subscribe(value=>{
    this.isLoading =value
    console.log(this.isLoading,"isloaded");
    
   }
  )
  }
}
