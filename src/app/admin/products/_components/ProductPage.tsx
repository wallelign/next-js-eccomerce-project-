"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"


export default function NewProductPage(){
    const[priceInCent,setPriceInCent]= useState<number>();
    return (
        <form className=" space-y-8">
            <div className=" space-y-2">
                <Label htmlFor="name"> Name</Label>
                <Input type="text" id="name" name="name" placeholder="Name" />
            </div>
            <div className=" space-y-2">
                <Label htmlFor="priceInCent"> Price In Cent</Label>
                <Input type="number" id="priceInCent" name="priceInCent" 
                        placeholder="Price In Cent" required 
                        value={priceInCent}
                        onChange={e=>setPriceInCent(Number(e.target.value) || undefined)} />
            </div>
        </form>
    )
}