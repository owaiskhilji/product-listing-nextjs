import sanityClient from "../../../../(use_sanity)/sanity/sanity.client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    console.log("ID Received:", id);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const data = await sanityClient.fetch(
      `*[_type == "products" && _id == $id][0]
      {
      
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
      }`,
      { id }
    );

    if (!data) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Dynamic API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
