import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductServices } from '../services/product services';
import { CategoryModel } from '../models/category.model';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { checkValidity } from '../services/file-validator';

@Component({
  selector: 'app-add-products',
  standalone:false,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit{
  addProductForm!:FormGroup
  categoryForm!:FormGroup
  category:CategoryModel[]=[]
  @ViewChild('categoryModal') categoryModal: any; // Modal reference
  formData:any = new FormData()
  selectedFile!:FileList
  file!:File
  message!:string
  alertType!:string
  showAlert!:boolean
  isUpdatePage:boolean=false
  objectId!:string
constructor( private modalService: NgbModal,private fb:FormBuilder,private productService:ProductServices,private router:Router,
  private route:ActivatedRoute){
  this.categoryForm = this.fb.group({
    category:[null,[Validators.required]]
  })
  this.addProductForm = this.fb.group({
    productName:[null,[Validators.required]],
    price:[null,[Validators.required,Validators.pattern('^[0-9]*$')]],
    categoryValues:[null,[Validators.required]],
    quantity:[null,[Validators.required,Validators.pattern('^[0-9]*$')]],
    description:[null,[Validators.required]],
    image:[null]
  });
  console.log(this.router.url.indexOf('update-product'),"Sssssssssssss")
  if(this.router.url.indexOf('update-product') != -1){
    this.isUpdatePage=true
  }
  else{
    this.isUpdatePage=false
  }
  if(this.isUpdatePage){
     this.route.paramMap.subscribe((res:ParamMap)=>{
      this.objectId= res.get('id') as string
      this.fetchUpdateDataforFields()

    })
  }
}
  ngOnInit(): void {
    this.fetchCategory()
  }
addCategory(){
  this.productService.addCategoryToApi(this.categoryForm.getRawValue()).subscribe(response=>{
    let stringified = JSON.stringify(response)
    let parsed = JSON.parse(stringified)
    if(parsed.status == 1010){
      this.modalService.dismissAll()
      this.fetchCategory()
    }
  },(err)=>{
    alert("Server Error")
  }
  )
}
openCategoryModal() {
  this.modalService.open(this.categoryModal);
}
fetchCategory(){
  this.productService.fetchCategory().subscribe((response:CategoryModel[])=>{
    this.category=response
  })

}
uploadFile(event:any){
this.selectedFile = event.target.files[0]
if(this.selectedFile.length > 0){
  this.addProductForm.patchValue({'image':this.selectedFile})
}
this.checkImageValidity()
this.formData.append('image',this.selectedFile)
}
checkImageValidity(){
  if((this.isUpdatePage && this.imageDeleted == true) || !this.isUpdatePage){
    this.addProductForm.get('image')?.markAsTouched()
    this.addProductForm.get('image')?.setValidators([Validators.required,checkValidity]);
    this.addProductForm.get('image')?.updateValueAndValidity()
    }
    else {
      this.addProductForm.get('image')?.clearValidators()
      this.addProductForm.get('image')?.updateValueAndValidity()
    }
}
onSubmit(){
  console.log(this.addProductForm,"log");
  this.checkImageValidity()
  if(this.addProductForm.invalid){
    this.addProductForm.markAllAsTouched()
    return
  }
this.formData.append('productName',JSON.stringify(this.addProductForm.get('productName')?.value))
this.formData.append('price',JSON.stringify(this.addProductForm.get('price')?.value))
this.formData.append('categoryValues',JSON.stringify(Number(this.addProductForm.get('categoryValues')?.value)))
this.formData.append('description',JSON.stringify(this.addProductForm.get('description')?.value))
this.formData.append('quantity',this.addProductForm.get('quantity')?.value);
this.productService.submitProduct(this.formData).subscribe({
  next:(res)=>{
    for(let keys of this.formData.keys()){
      this.formData.delete(keys)
    }
    let stringified = JSON.stringify(res)
    let parsed = JSON.parse(stringified)
    if(parsed.status == 1012){
      alert("Product added Successfuly")
      this.router.navigate(['/products/dashboard'])
    }
  },
  error(err){
    alert("Servor Error")
  }
})
}
updateProduct(){
  console.log(this.addProductForm,"log");

  if(this.addProductForm.invalid){
    this.addProductForm.markAllAsTouched()
    return
  }
  this.formData.append('productName',JSON.stringify(this.addProductForm.get('productName')?.value))
  this.formData.append('price',JSON.stringify(this.addProductForm.get('price')?.value))
  this.formData.append('categoryValues',JSON.stringify(Number(this.addProductForm.get('categoryValues')?.value)))
  this.formData.append('description',JSON.stringify(this.addProductForm.get('description')?.value))
  this.formData.append('quantity',this.addProductForm.get('quantity')?.value)
  this.formData.append('imageName',JSON.stringify(this.productObj?.image))

  // if(this.isUpdatePage && !this.imageDeleted){
  //   this.formData.append('image',JSON.stringify(this.productObj?.image))
  // }

  this.productService.updateProduct(this.objectId,this.formData).subscribe(response=>{
    for(let keys of this.formData.keys()){
      this.formData.delete(keys)
    }
    let stringified = JSON.stringify(response);
    let parsed =  JSON.parse(stringified);
    if(parsed.status == 1023){
         this.message = "Product updated successfuly";
         this.alertType="success";
         this.showAlert=true
         const nE:NavigationExtras={state:{data:{msg:this.message,alertType:this.alertType}}}
         this.router.navigate(['products/dashboard'],nE)

    }
    else if(parsed.status == 1022){
      this.message = "Product not found";
      this.alertType="danger";
      this.showAlert=true
    }
    else{
      this.message = "Server error";
      this.alertType="danger";
      this.showAlert=true
    }
  })
}
productObj:any
fetchUpdateDataforFields(){
  this.productService.fetchDataById(this.objectId).subscribe(response=>{
    this.productObj=response;
    debounceTime(500);
    this.setValues()
   })


}
setValues(){
  this.addProductForm.get('productName')?.patchValue(this.productObj?.productName)
  this.addProductForm.get('price')?.patchValue(this.productObj?.price)
  this.addProductForm.get('categoryValues')?.patchValue(this.productObj?.categoryValues?._id)
  this.addProductForm.get('description')?.patchValue(this.productObj?.description)
  this.addProductForm.get('quantity')?.patchValue(this.productObj?.quantity)
  this.addProductForm.get('image')?.clearValidators()
}
imageDeleted:boolean=false
deleteImage(){
this.imageDeleted = true;
this.checkImageValidity()
}
}
