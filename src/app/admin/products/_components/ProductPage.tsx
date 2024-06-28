"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/formatter"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"



export default function NewProductPage(){
    const [error,action]=useFormState(addProduct,{})
    const [priceInCent,setPriceInCent]= useState<number>();
    return (
        <form action={action} className="space-y-8">
            <div className=" space-y-2">
                <Label htmlFor="name"> Name</Label>
                <Input type="text" id="name" name="name" placeholder="Name" />
                {error.name && <div className=" text-destructive"> {error.name}</div>}
            </div>
            <div className=" space-y-2">
                <Label htmlFor="priceInCent"> Price In Cent</Label>
                <Input type="text" id="priceInCent" name="priceInCent" 
                        placeholder="Price In Cent"
                        value={priceInCent} 
                        onChange={(e)=>setPriceInCent(Number(e.target.value || undefined))} />
            </div>
            <div className=" text-muted-foreground">
                {formatCurrency((priceInCent ||0)/100)}
                {error.priceInCent && <div className=" text-destructive"> {error.priceInCent}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="descripition">Description</Label>
                <Textarea   id="descripition" name="descripition" 
                     />
            {error.descripition && <div className=" text-destructive"> {error.descripition}</div>}
            </div>

            <div className=" space-y-2">
                <Label htmlFor="file"> File</Label>
                <Input type="file" id="file" name="file" placeholder="File" />
                {error.file && <div className=" text-destructive"> {error.file}</div>}
            </div>

            <div className=" space-y-2">
                <Label htmlFor="image"> Image</Label>
                <Input type="file" id="image" name="image" placeholder="image" />
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