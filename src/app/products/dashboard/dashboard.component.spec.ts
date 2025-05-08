import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductServices } from '../services/product services';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { environments } from '../../../environment/environment-dev';


describe('DashboardComponent', () => {
  let productService: ProductServices;
  let store: MockStore;
  const initialState = { products: [] };
  let httpController:HttpTestingController;
  let serverUrl = environments.url;
  const mockProducts = [{ productId: 1, name: '1' }, { productId: 2, name: 'Masai' }];
  let fixture:ComponentFixture<DashboardComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductServices,
        provideMockStore({ initialState })], // ✅ Provide NgRx mock store],
    }).compileComponents();

    productService = TestBed.inject(ProductServices);
    store = TestBed.inject(Store) as MockStore; // ✅ Inject mock store
    httpController=TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(DashboardComponent)
  });

  it('should return an array of products', () => {
    
    productService.fetchData().subscribe((response: any) => {
      console.log("entere it>>>",response)

      expect(response).toBeTruthy('No Value')
      expect(response).toEqual(mockProducts); // ✅ Expect actual values
    });
   let req =  httpController.expectOne(serverUrl + 'api/products/fetch-products');
   expect(req.request.method).toEqual("GET")
   req.flush(mockProducts)
  });


});
