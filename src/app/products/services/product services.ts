import { Injectable } from "@angular/core";
import { environments } from "../../../environment/environment-dev";
import { HttpClient } from "@angular/common/http";
import { CategoryModel } from "../models/category.model";
import { BehaviorSubject, map } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
    providedIn:'root'
})
export class ProductServices{
    private serverUrl = environments.url
    productData:BehaviorSubject<any>=new BehaviorSubject<any>(null)
    constructor(private http:HttpClient,private sanitization:DomSanitizer){}
    addCategoryToApi(data:any){
      return this.http.post(this.serverUrl + 'api/products/add-categories',data)
    }
    fetchCategory(){
      return this.http.get<CategoryModel[]>(this.serverUrl + 'api/products/get-category')
    }
    submitProduct(data:FormData){
      return this.http.post(this.serverUrl + 'api/products/add-product',data)
    }
    fetchData(){
      return this.http.get(this.serverUrl + 'api/products/fetch-products').pipe(map(data=>{
        this.productData.next(data)
        return data
      }))
    }
    transferFilteredData(data:any){
      console.log(data,"data");
      
      this.productData.next(data)
    }
    bypassSecurity(file:string){
      return this.sanitization.bypassSecurityTrustResourceUrl(file)
      }

  fetchDataById(objectId:string){
    return this.http.get(this.serverUrl + 'api/products/fetch-product/' + objectId)
  }
}