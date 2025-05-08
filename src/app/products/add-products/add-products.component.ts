import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductServices } from '../services/product services';
import { CategoryModel } from '../models/category.model';
import { Router } from '@angular/router';

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
constructor( private modalService: NgbModal,private fb:FormBuilder,private productService:ProductServices,private router:Router){
  this.categoryForm = this.fb.group({
    category:[null,[Validators.required]]
  })
  this.addProductForm = this.fb.group({
    productName:[null],
    price:[null],
    categoryValues:[null],
    description:[null],
    image:[null]
  })
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
console.log(this.selectedFile,this.addProductForm);

this.formData.append('image',this.selectedFile)
}
onSubmit(){
this.formData.append('productName',JSON.stringify(this.addProductForm.get('productName')?.value))
this.formData.append('price',JSON.stringify(this.addProductForm.get('price')?.value))
this.formData.append('categoryValues',JSON.stringify(Number(this.addProductForm.get('categoryValues')?.value)))
this.formData.append('description',JSON.stringify(this.addProductForm.get('description')?.value))
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
}
