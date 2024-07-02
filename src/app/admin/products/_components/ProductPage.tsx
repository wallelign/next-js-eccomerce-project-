"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/formatter"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"



export default function NewProductPage({product}:{product:Product | undefined | null}){
    const [error,action]=useFormState(product == null ? addProduct: updateProduct.bind(null,product.id),{})
    const [priceInCent,setPriceInCent]= useState<number | undefined>(product?.priceInCents);
    // console.log(priceInCent);
    return (
        <form action={action} className="space-y-8">
            <div className=" space-y-2">
                <Label htmlFor="name"> Name</Label>
                <Input type="text" id="name" name="name" 
                placeholder="Name" 
                defaultValue={product?.name} />
                {error.name && <div className=" text-destructive"> {error.name}</div>}
            </div>
            <div className=" space-y-2">
                <Label htmlFor="priceInCent"> Price In Cent</Label>
                <Input type="text" id="priceInCent" name="priceInCent" 
                        placeholder="Price In Cent"
                        value={priceInCent} 
                        defaultValue={product?.priceInCents} 
                        onChange={(e)=>setPriceInCent(Number(e.target.value || undefined))} />
            </div>

            {/* display price in cent */}
            <div className=" text-muted-foreground">
                {formatCurrency((priceInCent ||0)/100)}
                {error.priceInCent && <div className=" text-destructive"> {error.priceInCent}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="descripition">Description</Label>
                <Textarea   id="descripition" 
                      name="descripition"
                     defaultValue={product?.description} />
            {error.descripition && <div className=" text-destructive"> {error.descripition}</div>}
            </div>

            <div className=" space-y-2">
                <Label htmlFor="file"> File</Label>
                <Input type="file" id="file" name="file" 
                      placeholder="File" 
                      required={product==null}
                      />

                   {product?.filePath != null && 
                    <div className=" text-muted-foreground">
                        {product?.filePath}
                    </div>}

                {error.file && <div className=" text-destructive"> {error.file}</div>}
            </div>

            <div className=" space-y-2">
                <Label htmlFor="image"> Image</Label>
                <Input type="file" id="image" name="image" 
                        placeholder="image"
                        required={product==null}/>

                 {product?.imagePath != null && 
                 <div className=" w-28 h-20">
                     <img src={product?.imagePath} />
                </div>}

                {error.image && <div className=" text-destructive"> {error.image}</div>}
            </div>
            <SubmitButton/>
        </form>
    )
}

function SubmitButton(){
    const {pending}=useFormStatus();
   return(
    <Button type="submit" disabled={pending}> {pending ? "Saving...":"Save"}</Button>
   )
}