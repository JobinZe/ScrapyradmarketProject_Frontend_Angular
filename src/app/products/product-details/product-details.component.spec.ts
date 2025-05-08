import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductServices } from '../services/product services';
import { environments } from '../../../environment/environment-dev';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { ProductDetailsComponent } from './product-details.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

fdescribe('ProductDetailsComponent', () => {
  let productService:ProductServices
  let serverUrl = environments.url;
  let initialState = {product : []}
  let objectId='67bef5359509b499253c0e11'
  let http:HttpTestingController
  let store:MockStore
  let component:ProductDetailsComponent
  let fixture:ComponentFixture<ProductDetailsComponent>
  let el:DebugElement
  beforeEach(async () => {
     
   await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      ],
      providers: [
        ProductServices,
        provideMockStore({ initialState }),
       {
        provide:ActivatedRoute,
        useValue:{paramMap:of({get:()=>'67bef5359509b499253c0e11' })}
       }
      ]
    }).compileComponents();
     productService=TestBed.inject(ProductServices)
     http=TestBed.inject(HttpTestingController)
     store=TestBed.inject(Store) as MockStore
     fixture=TestBed.createComponent(ProductDetailsComponent)
     component=fixture.componentInstance
     el = fixture.debugElement
  });

  fit('should fetch one product based on Id', fakeAsync(() => {
    let mockData = {
      "_id": "67bef5359509b499253c0e11",
      "productName": "testing"
    };
  
    // Trigger the API call
    let response: any;
    productService.fetchDataById(objectId).subscribe(
      (res) => {
        response = res;
        // Verify the response
        expect(response).toBeTruthy('Not Received');
        expect(response).toEqual(mockData);
        // Verify the DOM
      },
      (err) => {
        fail('Expected a successful response, but got an error: ' + err.message);

      }
    );


    const request = http.expectOne(serverUrl + 'api/products/fetch-product/' + objectId);
    expect(request.request.method).toEqual('GET');
  
    // Respond with mock data
    request.flush(mockData);
  }));
  fit('should check for container',(done)=>{
   let element = el.queryAll(By.css('.product-details-container'))
    expect(element.length).toBe(1)
    done()
  })
  afterEach(() => {
    http.verify();
  });

});
