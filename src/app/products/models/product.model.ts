import { CategoryModel } from "./category.model";

export interface ProductModel{
    updatedProduct:ProductItems[]
}
export interface ProductItems{
    _id: string,
    productName: string,
    price: Number,
    description: string,
    image: string,
    productId: 2,
    categoryValues:CategoryModel,
    addToCart:boolean
}