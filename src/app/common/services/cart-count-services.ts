import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class CartCountService{
private cartCount = new BehaviorSubject<number>(0);
public cartCount$:Observable<number> = this.cartCount.asObservable()

setCartCount(count:number){
 this.cartCount.next(count)
}
}