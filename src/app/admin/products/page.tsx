import { Button } from "@/components/ui/button"
import PageHeader from "../_components/PageHeader"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"
import { formatCurrency } from "@/lib/formatter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function AdminProduct(){
    return (
         <>
         <div className=" flex justify-between items-center gap-4">
           <PageHeader>products </PageHeader>
             <Button asChild> 
                <Link href="/admin/product/new">Add product</Link>
             </Button>
         </div>
         <ProductTable/>
        </>
    )
  
}

async function ProductTable(){
    const products = await db.product.findMany({
        select:{
           id:true,
            name:true,
            priceInCents:true,
            isAvailableForPurchase:true,
            _count:{select:{orders:true}},
        },
        orderBy:{name:"asc"}
    })
    if(products.length ===0) return <p> NO Product</p>

     return (
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className=" sr-only"> Available</span>
                </TableHead>
                <TableHead> Name</TableHead>
                <TableHead> Price</TableHead>
                <TableHead> Order</TableHead>
                <TableHead className=" w-0">
                    <span className=" sr-only"> Action</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map(product => (
            <TableRow key={product.id}>
                <TableCell>
                    {product.isAvailableForPurchase ?
                     <><CheckCircle2/></> :<><XCircle/></>}
                </TableCell>
                <TableCell>
                    {product.name}
                </TableCell>
                <TableCell>
                    {formatCurrency(product.priceInCents / 100)}
                </TableCell>
                <TableCell>
                    {product._count.orders}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <MoreVertical/>
                        <span className=" sr-only"> Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <a download href={`/admin/products/${product.id}/download`}> Download</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}/edit`}> Edit</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
     </Table>
     )
    
}