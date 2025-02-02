"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
function Page() {
  const router = useRouter()
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => setData(res.products))
      .catch((e) => console.log(e));
  }, []);
console.log("DATA...",data)
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((e:any, i) => (
          <div
            key={i}
            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
          >
            <div className="h-48 flex items-center justify-center bg-gray-100">
              <img
                src={e.thumbnail}
                alt={e.title}
                className="h-full w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 truncate">{e.title}</h3>
              <p className="text-sm text-gray-600 mt-2 h-16 overflow-hidden">
                {e.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-semibold text-blue-600">
                  {e.price} Rs
                </span>
                <button
                type="button"
              onClick={()=>router.push(`/product/${e.id}`)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
