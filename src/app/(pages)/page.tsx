"use client";


import Slider from "@/Components/Slider";
import Bottomcart from "@/Components/Bottomcart";
import React, { useState, useEffect,useContext } from "react";
import { useRouter } from "next/navigation";
import  Link  from "next/link";
import ProductContext from "@/Context/ProductContext"
import dotenv from 'dotenv'
dotenv.config()
interface Product {
  name: string;
  price: number;
  imageURL: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const value :any = useContext(ProductContext)
 const router = useRouter()
 
  const handle =(e:any)=>{
    router.push("/product")
    value.setgetData(products)
  }
  const handle2 =(e:any)=>{
    router.push("/product")
    value.setgetData(products)
  }
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        // const response = await fetch(`process.env.NEXT_PUBILC_API_URL/product`);
        const response = await fetch(`/api/product`);
        console.log("respo",response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
        // console.log(data)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  fetchProducts();
  }, []);

  const limitedProducts = products.slice(38, 42);
  const sencondLimitedProducts = products.slice(45,49);
if(!limitedProducts)return <span className="loading loading-ring loading-lg text-black"></span>
if(!sencondLimitedProducts)return <span className="loading loading-ring loading-lg text-black"></span>




return (
    <div>
      <Slider />
      <div className="mt-10">
      <div >
      <h1 id="arrival" className="font-extrabold flex justify-center text-2xl md:text-4xl ">
NEW ARRIVALS
</h1>
      </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        { limitedProducts.length > 0  ?  (
        limitedProducts.map((item :any, index:number) => (
          <div
            key={index}
            className="bg-white w-full max-w-sm overflow-hidden font-[sans-serif] mt-4 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href={`/product/detail/${item._id}`}>
            <div className="md:min-h-[256px] relative">
              {/* <Image
                alt={item.name || "Product image"}
                src={item.imageUrl}
                className="w-full object-cover"
                 layout="fill"
              /> */}
              <img
                alt={item.name || "Product image"}
                src={item.imageUrl}
               className="w-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <p className="mt-4 text-md font-semibold text-gray-700 leading-relaxed">
                {item.name}
              </p>
              <div className="flex gap-5 items-center">
                <h1 className="font-extrabold text-lg md:text-2xl text-black">
                  ${item.price }
                </h1>
                <h1 className="font-extrabold text-sm sm:text-sm md:text-md border-2 rounded-xl bg-red-300 text-red-600 p-1">
                  -{item.discountPercent }%
                </h1>
              </div>
            </div>
          </Link>
          </div>
        ))
      ):(
<div className="flex justify-center items-center h-screen ml-20">
  <div >
    <span className="loading loading-ring loading-lg"></span>
  </div>
  </div>
      )
      }
      
        
      </div>
      <div className="mt-6 border-2 border-black rounded-full text-sm w-52 mx-auto p-3 item-center">
      <button
       onClick={handle}
      className="ml-16 ">veiw All</button>
      </div> 
      </div> 
{/* second */}
<div className="mt-10">
      <div >
      <h1 id="sale" className="font-extrabold flex justify-center text-2xl md:text-4xl ">
TOP SELLING
</h1>
      </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        { sencondLimitedProducts.length > 0 ?(
          sencondLimitedProducts.map((item :any, index:number) => (
        
            <div
            key={index}
            className="bg-white w-full max-w-sm overflow-hidden font-[sans-serif] mt-4 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
            <Link href={`/product/detail/${item._id}`}>
            <div className=" md:min-h-[256px] relative">
              {/* <Image
                alt={item.name || "Product image"}
                src={item.imageUrl}
                className="w-full object-cover"
                layout="fill"
                /> */}
              <img
                alt={item.name || "Product image"}
                  src={item.imageUrl}
                className="w-full object-cover"
                />
            </div>

            <div className="p-6 space-y-4">
                  
              <p className="mt-4 text-md font-semibold text-gray-700 leading-relaxed">
                {item.name}
              </p>
              <div className="flex gap-5 items-center">
                <h1 className="font-extrabold text-lg md:text-2xl text-black">
                  ${item.price }
                </h1>
                <h1 className="font-extrabold text-sm sm:text-sm md:text-md border-2 rounded-xl bg-red-300 text-red-600 p-1">
                  -{item.discountPercent }%
                </h1>
              </div>
            </div>
          </Link>
          </div>
        ))):(
          <div className="flex justify-center items-center h-screen">
  <div className="mx-2">
    <span className="loading loading-ring loading-lg"></span>
  </div>
  </div>
                )
      }
        
      </div>

      <div className="mt-6 border-2 border-black rounded-full text-sm w-52 mx-auto p-3 item-center">
      <button 
       onClick={handle2}
       className="ml-16 ">veiw All</button>
      </div> 
      </div> 
<Bottomcart/>



      <br/>
      <br/>
      <br/>
    </div>
  );
}



