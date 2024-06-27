import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";

async function  gteSalesData(){
    const data= await db.order.aggregate({
        _sum:{pricePaidInCents:true},
        _count:true,
    })
    await wait(2000);
    return {
        amount:(data._sum.pricePaidInCents || 0)/100,
        numberOfSales:data._count
    }
}
function wait(duration:number){
    return new Promise(resolve=>setTimeout(resolve,duration));
}
async function getUserData(){
   const [userCount,orderData]=await Promise.all([
          db.user.count(),
          db.order.aggregate({
        _sum:{pricePaidInCents:true}
    })
   ])
   return {
    userCount,
    averageValuePerUSer:userCount===0 ? 0:( orderData._sum.pricePaidInCents ||0)/userCount/100,
   }
}
async function getProductData(){
    const [countActiveProduct,countInactiveProduct]= await Promise.all([
       db.product.count({where:{isAvailableForPurchase:true}}),
       db.product.count({where:{isAvailableForPurchase:false}})
    ])
    return{
       countActiveProduct,
       countInactiveProduct
    }
   
}
export default async function AdminDashboard(){
    const [salesData,userData,productData]= await Promise.all([
         gteSalesData(),
         getUserData(),
         getProductData()
    ])
    return(
     <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
            title="Sales"
            subtitle={formatNumber(salesData.numberOfSales)}
            body={formatCurrency(salesData.amount)}/>

         <DashboardCard 
           title="Customers"
           subtitle={formatNumber(userData.userCount)}
           body={formatCurrency(userData.averageValuePerUSer)}/>

         
        <DashboardCard 
         title="ActiveProducts"
         subtitle={formatNumber(productData.countActiveProduct)}
         body={formatCurrency(productData.countInactiveProduct)}/>
        
        
     </div>

    )
}

type dashboardCardProps={
    title:String,
    subtitle:string,
    body:String
}


async function DashboardCard({title,subtitle,body}:dashboardCardProps){
       return( 
       <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
       )
}