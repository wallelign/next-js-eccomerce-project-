import { Button } from "@/components/ui/button"
import PageHeader from "../_components/PageHeader"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


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

function ProductTable(){
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
            <TableRow>
            <TableCell>
                    <span> Available</span>
                </TableCell>
                <TableCell>
                    <span> Available</span>
                </TableCell>
                <TableCell>
                    <span> Available</span>
                </TableCell>
                <TableCell>
                    <span> Available</span>
                </TableCell>
                <TableCell>
                    <span> Available</span>
                </TableCell>
            </TableRow>
        </TableBody>
     </Table>
     )
    
}