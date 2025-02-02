"use client"
import React, { useState, useEffect} from "react";
interface Product {
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  products: Product[];
  orderNumber:string;
  orderdate: string; 
  totalprice: number; 
}

export default function page(){
    const [checkoutproducts, setcheckoutproducts] = useState<Order[]>([]);
    const [customername, setcustomername] = useState("");
    const [email, setEmail] = useState("");
    const [number, setnumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setcity] = useState("");
    const [province, setprovince] = useState("");
    const [postalcode, setpostalcode] = useState("");


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/get-order");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Order[] = await response.json();
         setcheckoutproducts((prev:any) => {
        return JSON.stringify(prev) === JSON.stringify(data) ? prev : data;
      });
        // console.log(data)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  fetchProducts();
  }, []);







  const handleSubmit = async (e: React.FormEvent,orderId:any) => {
    e.preventDefault();
    console.log("ORDERID",orderId)
    const customerData = {
      customername:customername,
      number:number,
      email:email,
      city:city,
      address:address,
      postalcode:postalcode,
      province:province,
      orderId, 
    };

    try {
      const response = await fetch("/api/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Customer Created:", result.customer);
        // Yahan pe customer creation ka success message dikhaiye ya form reset kijiye
      } else {
        console.error("Error:", result.error);
        // Yahan pe error message dikhaiye
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };












  if(!checkoutproducts.length)return <div className='h-screen flex justify-center mt-12'><span className="loading loading-ring loading-lg text-black"></span></div>


  return(
        <div className="py-16">
          <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
   {/* GET CART */}

        <div  className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          
   {checkoutproducts && checkoutproducts.length >0 ?(
    checkoutproducts.map((order:any,index:number)=>(

          
          <div key={index} className="relative h-full">
           
           <h1 className="text-sm lg:text-base text-gray-800 ml-4 mt-4 text-bold">Order Number : {order.orderNumber}</h1>
           
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">

               { order.products.map((cart:any,i:number)=>(
                <div key={i} className="flex items-start gap-4">
                  <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                    <img src={cart.imageUrl} className="w-full object-contain" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-sm lg:text-base text-gray-800">{cart.name}</h3>
                    <ul className="text-xs text-gray-800 space-y-1 mt-3">
                      <li>Size <span className="float-right">{cart.size}</span></li>
                      <li>Quantity <span className="float-right">{cart.quantity}</span></li>
                      <li>Total Price <span className="float-right">${cart.price}</span></li>
                    </ul>
                  </div>
                </div>

               ))
        
              }
        
              </div>
            </div>

            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">Total <span className="ml-auto">${order.totalprice}</span></h4>
            </div>
          </div>

        ))):(
          <p>CART IS NOT SELECTED</p>
        )}

        </div>


      
      
  {/* PERSONAL DETAIL */}
      
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8">
            <div>
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Customer Name"
                  value={customername}
                  onChange={e=>setcustomername(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>

                

                <div>
                  <input type="email" placeholder="Email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>

                <div>
                  <input type="number" placeholder="Phone No."
                  value={number}
                  onChange={e=>setnumber(e.target.value)}

className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Address Line"
                                    value={address}
                                    onChange={e=>setAddress(e.target.value)}
                  
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input type="text" placeholder="City"
                                    value={city}
                                    onChange={e=>setcity(e.target.value)}
                  
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input type="text" placeholder="State"
                                    value={province}
                                    onChange={e=>setprovince(e.target.value)}
                  
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input type="text" placeholder="Postal Code"
                                    value={postalcode}
                                    onChange={e=>setpostalcode(e.target.value)}
                  
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
              </div>

              <div className="flex gap-4 max-md:flex-col mt-8">
                <button type="button" className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1">Cancel</button>
                <button type="button"
                onClick={handleSubmit}
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-black hover:bg-stone-300 hover:text-black text-stone-300 rounded-md">Complete Purchase</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>. 

    </div> 
    )
}