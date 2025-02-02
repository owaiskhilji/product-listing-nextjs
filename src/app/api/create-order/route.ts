import sanityClient from  "../../(use_sanity)/sanity/sanity.client";
import { NextResponse } from "next/server";
import {uploadImage} from "../../../Constants/utils"
export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    // console.log("Received Request Body:", requestBody)
    
    const ordernumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const { products, totalprice, orderdate } = requestBody;
    const imageId = await uploadImage(products[0].image)
    console.log(`Image uploaded successfully: ${imageId}`);

    // console.log("ORDER NUMBER:", ordernumber);
    
    const dataOrder = await sanityClient.create({
      _type: "order",
      orderNumber: ordernumber,
      products: products.map((product: any) => ({
         _key: `${product.name}-${Date.now()}-${Math.random()}`,
         _type: "products",
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        size: product.selectedsize || product.sizes?.[0],
        image: product.image
        ? {
            _type: "image",
            asset: { _ref: imageId },
          }
        : null,
      })),
      totalprice: totalprice,
      orderdate: orderdate,
      customer:null
    });

    console.log("Sanity Response:", dataOrder);

    return NextResponse.json({ message: "Order Successfully Created", orderId: dataOrder._id });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
