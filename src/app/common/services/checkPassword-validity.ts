import { FormGroup, ValidationErrors } from "@angular/forms";

export function passwordValidity(control:FormGroup):ValidationErrors | null |undefined{
    const formGroup = control;
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if((newPassword==null || newPassword == '') && (confirmPassword == null || confirmPassword == '' )){
        return
    }
    if(newPassword === confirmPassword ){
        formGroup.get('confirmPassword')?.setErrors(null)
    }
    else{
        formGroup.get('confirmPassword')?.setErrors({passwordMissmatch : true})
    }
    return
    
}