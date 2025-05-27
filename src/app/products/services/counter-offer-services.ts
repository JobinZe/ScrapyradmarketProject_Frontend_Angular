import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environments } from "../../../environment/environment-dev";

@Injectable({
    providedIn:'root'
})
export class CounterOfferServices{
    private serverUrl = environments.url + 'api/counter/'
    private http = inject(HttpClient)
    submitCounter(data:any,id:any){
     return this.http.post(this.serverUrl + 'counter-offer/' + id,{data})
    }
    checkForCounter(){
        return this.http.get(this.serverUrl + 'counter-offer-exist')
    }
    fetchCounterDetail(){
        return this.http.get(this.serverUrl + 'display-counter-offer' )

    }
    settleCounter(counterId:any,data:any){
        return this.http.post(this.serverUrl + 'accept-reject-counter-offer/' + counterId,{data} )

    }
    acceptedCounter(){
        return this.http.get(this.serverUrl + 'accepted-counter' )
    }
}