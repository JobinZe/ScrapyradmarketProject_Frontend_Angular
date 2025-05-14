import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms"
import { debounceTime } from "rxjs"

const fileTypes=['pdf','xlsx']
const imageType=['jpg','jpeg','png']
const validFile=['pdf','xlsx','jpeg','jpg','png']
export function fetchFileType(productObj :any):string{
    let extension = productObj?.image.split('.').pop()
    if(imageType.includes(extension)) return 'image'
    if(fileTypes.includes(extension)) return 'document'
    return 'undefined'
   }

export function checkValidity (control:AbstractControl):ValidationErrors | null{
        const imageName = control?.value;
        console.log(control,imageName,"img name")
        debounceTime(500)
        console.log(control.errors);
        if(typeof imageName != 'string' || imageName.indexOf('.')==-1){
            return {invalidFileType:true}
        }
        const extension = imageName?.split('.')?.pop()?.toLowerCase();
        if(!extension || !validFile.includes(extension)){
            return {invalidFileType:true}
        }
        return null

 
}