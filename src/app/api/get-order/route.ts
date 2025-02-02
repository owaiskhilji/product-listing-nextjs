import sanityClient from "../../(use_sanity)/sanity/sanity.client"
import { NextResponse } from "next/server"
export async function GET() {
    try {
            const data = await sanityClient.fetch(
                `*[_type == "order"] {
  products[]{
    name,
    size,
    price,
    quantity,
    "imageUrl" : image.asset->url,
  },
  orderNumber,
    orderdate,
    totalprice
}

            `);
            return NextResponse.json(data);
    } catch (error) {
        console.log("order get server error 500",error)
    }
    
}




