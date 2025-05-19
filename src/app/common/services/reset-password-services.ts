import { Injectable } from "@angular/core";
import { environments } from "../../../environment/environment-dev";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})
export class ResetPasswordService{
    constructor(private http:HttpClient){}
    private serverUrl =  environments.url + 'api/auth/'
    resetPassword(data:any,token:any){
      return this.http.post(this.serverUrl + `reset-password/${token}`,data)
    }
}