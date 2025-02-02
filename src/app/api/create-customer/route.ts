import sanityClient from  "../../(use_sanity)/sanity/sanity.client";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
     console.log("Received Request Body:", requestBody)
    
    // const ordernumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const { customername,number,email,city,address,postalcode,province,orderId } = requestBody;
    
    const dataCustomer = await sanityClient.create({
      _type: "customer",
      customername:customername,
      number:number,
      email:email,
      city:city,
      address:address,
      postalcode:postalcode,
      province:province,
      order: [{ _type: "reference", _ref: orderId }],
    });
if(orderId){
    await sanityClient.patch(orderId)
      .set({ customer: { _type: "reference", _ref: dataCustomer._id } })
      .commit();

      console.log(`Order ${orderId} updated with Customer ${dataCustomer._id}`)

}
    console.log("Sanity Response:", dataCustomer._id);

    return NextResponse.json({ message: "Order Successfully Created", customerId: dataCustomer._id });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
