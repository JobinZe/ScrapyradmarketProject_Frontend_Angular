
const fileTypes=['pdf','xlsx']
const imageType=['jpg','jpeg','png']
export function fetchFileType(productObj :any):string{
    let extension = productObj?.image.split('.').pop()
    if(imageType.includes(extension)) return 'image'
    if(fileTypes.includes(extension)) return 'document'
    return 'undefined'
   }