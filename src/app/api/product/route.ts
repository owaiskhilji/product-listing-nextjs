import  sanityClient  from "../../(use_sanity)/sanity/sanity.client";
import {  NextResponse } from "next/server";

export async function GET() {
    const data = await sanityClient.fetch(
        `
    *[_type=="products"]{
  _id,
  name,
  description,
  price,
  "imageUrl" : image.asset->url,
  category,
  discountPercent,
  "isNew": new,
colors,
sizes
 }
    `);
    return NextResponse.json(data);
}