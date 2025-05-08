import { fakeAsync, tick } from "@angular/core/testing"

describe('Test async',()=>{
fit('testing async nature',fakeAsync(()=>{
let boolean =false
setTimeout(()=>{
    boolean=true
},1500)
tick(1500)
expect(boolean).toBeTruthy("FAILED")

}))
})