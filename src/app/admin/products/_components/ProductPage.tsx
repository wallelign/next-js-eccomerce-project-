"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export default function NewProductPage(){
    return (
        <form className=" space-y-8">
            <div className=" space-y-2">
                <Label htmlFor="name"> Name</Label>
                <Input type="text" id="name" name="name" placeholder="Name" />
            </div>
            <div className=" space-y-2">
                <Label htmlFor="priceInCent"> Price In Cent</Label>
                <Input type="text" id="priceInCent" name="priceInCent" placeholder="Price In Cent" />
            </div>
        </form>
    )
}