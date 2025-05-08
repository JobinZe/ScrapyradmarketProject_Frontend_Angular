import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoaderService{
    public loaderStatus=new BehaviorSubject(false);
    private readonly loadering$ = this.loaderStatus.asObservable()

    showLoader(){
        this.loaderStatus.next(true)
        console.log(console.log("Called"));
        
    }
    hideLoader(){
        this.loaderStatus.next(false)
    }
}