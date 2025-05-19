import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environments } from "../../../environment/environment-dev"

@Injectable({
    providedIn:'root'
})
export class PaymentServices{
    private serverUrl = environments.url + 'api/payment/'
    constructor(private http:HttpClient){}

addPaymentDetails(data:any){
    return this.http.post(this.serverUrl + 'add-payment-details',data)
}
fetchPaymentDetail(){
    return this.http.get(this.serverUrl + 'get-payment-detail')

}

}