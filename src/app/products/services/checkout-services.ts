import { Injectable, inject } from "@angular/core";
import { environments } from "../../../environment/environment-dev";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class CheckoutService{
    private serverUrl = environments.url + 'api/checkout/'
    constructor(private http:HttpClient){}

checkOutApi(data:any){
    return this.http.post(this.serverUrl + 'checkout',data)
}
getCheckoutApi(){
    return this.http.get(this.serverUrl + 'get-checkout')
}
}