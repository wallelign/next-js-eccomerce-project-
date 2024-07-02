import PageHeader from "@/app/admin/_components/PageHeader";
import FormData from "../../_components/ProductPage";
import db from "@/db/db";
export default async  function NewProductPage({
        params:{id}
        }:
        {params:{id:string}
        })
    {
        const product =await db.product.findUnique({where:{id}});
        return(
            <>
            <PageHeader> Edit Product</PageHeader>
            <FormData product={product}/>
           
            </>
        )
    }