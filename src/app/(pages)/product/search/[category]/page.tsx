"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link'
export default function ProductPage({ params }:any) {
    const {category}= params;
     const [product, setProduct] = useState<any>([]);
     const [loading, setLoading] = useState(true);
console.log("ID",category)
console.log("product",product)
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`/api/product/search/${category}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [category]);

    if (loading) return <div className="mt-44 flex justify-center"><span className="loading loading-ring loading-lg"></span></div>;

    if (!product) return <div>Product not found!</div>;

    return(
<div className="mt-16">
<div className="flex md:justify-center relative bottom-5">
  <h1 className="font-extrabold text-xl md:text-4xl relative bottom-2">
    {category}
  </h1>
</div>
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
{product && product.length > 0  ?  (
  product.map((item :any, index:number) => (
  <div
    key={index}
    className="bg-white w-full max-w-sm overflow-hidden font-[sans-serif] mt-4 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  >
    <Link href={`/product/detail/${item._id}`}>
    <div className="md:min-h-[256px] relative">
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
<p className="text-gray-500">No products available.</p>
)
}


</div>

</div>


    )
}

