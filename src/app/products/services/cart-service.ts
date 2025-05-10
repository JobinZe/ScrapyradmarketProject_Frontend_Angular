import { Injectable, inject } from "@angular/core";
import { environments } from "../../../environment/environment-dev";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class CartService{
    private serverUrl = environments.url + 'api/cart/'
    private http = inject(HttpClient)

getCart(){
return this.http.get(this.serverUrl + 'get-cart-details')
}
addToCatApi(objectId:string){
    return this.http.post(this.serverUrl + 'add-to-cart/'+ objectId, null)
  }
}