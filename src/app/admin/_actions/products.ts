"use server"
import db from "@/db/db"
import { object, z } from "zod"
import fs from 'fs/promises'
import { redirect } from "next/navigation"

const fileSchema=z.instanceof(File,{message:"required"})
const imageSchema=fileSchema.refine(
    file=>file.size === 0 ||file.type.startsWith("image/")
)
 const addSchema=z.object({
    name:z.string().min(1),
    descripition:z.string().min(1),
    priceInCent:z.coerce.number().int().min(1),
    file:fileSchema.refine(file=>file.size >0,"Required"),
    image:imageSchema.refine(file=>file.size > 0,"Required")

})  
export async function addProduct(prevState:unknown,formData: FormData){
    const result= addSchema.safeParse(Object.fromEntries(formData.entries())) 
    if(result.success ===false){
        return result.error.formErrors.fieldErrors;
    }
    const data= result.data

    await fs.mkdir("products",{recursive:true})
    const filePath=`products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath,Buffer.from(await data.file.arrayBuffer()))
    
    await fs.mkdir("public/products",{recursive:true})
    const imagePath=`/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`,Buffer.from(await data.image.arrayBuffer()))

   await db.product.create({data:{
        isAvailableForPurchase:false,
        name:data.name,
        priceInCents:data.priceInCent, 
        description:data.descripition,
        filePath,        
        imagePath 
}})
redirect('/admin/products')
}