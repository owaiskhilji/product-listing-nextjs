"use client"
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation"
export default function ProductPage({ params }:any) {
    const {id}= params;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);
const router = useRouter()


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`/api/product/detail/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductData();
    }, [id]);


function handleWish(){
  if(product){
    const existingData = localStorage.getItem('wishData');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push(product);
    const saveData = JSON.stringify(parsedData);
    localStorage.setItem('wishData', saveData);
    return product;
  }
}
function addtocarthandle(){
  router.push("/cart")
  if(product){
    const existingData = localStorage.getItem('addtocart');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push(product);
    const saveData = JSON.stringify(parsedData);
    localStorage.setItem('addtocart', saveData);
    return product;
  }
}



if (loading) return <div className="mt-44 flex justify-center "><span className="loading loading-ring loading-lg"></span></div>;

    if (!product) return <div>Product not found!</div>;

    return (
        <div>
<div className="font-[sans-serif] p-4">
      <div className="xl:max-w-screen-xl lg:max-w-screen-lg max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">
          <div className="w-full lg:sticky top-0 lg:col-span-3">
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <img src={product.imageUrl} alt="Product" className="w-full aspect-[750/800] object-top object-cover" />
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-2">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">{product.name} | {product.category}</h3>
              <div className="flex items-center space-x-1 mt-2">
                <svg className="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>

                <p className="text-sm text-gray-800 !ml-3">4.0 (150)</p>
              </div>
              <div className="flex items-center flex-wrap gap-4 mt-6">
                <h4 className="text-gray-800 text-2xl font-bold">${product.price}</h4>
                <p className="text-red-600 bg-red-300 px-1  text-sm">-{product.discountPercent}%<span className="text-sm text-black ml-1.5">{product.isNew}</span></p>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <div>
              <h3 className="text-lg font-bold text-gray-800">Sizes</h3>
              <div className="flex flex-wrap gap-4 mt-4">
             {
                product.sizes.map((size:string,i:number)=>(
                <button 
                key={i}
                type="button" className="w-10 h-9 border border-gray-300 hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0">{size}</button>
            ))
        }
        </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800">Colors</h3>
                <div className="flex flex-wrap gap-4 mt-4">
              {product.colors.map((color:any, i:number) => (
        <button
          key={i}
          type="button"
          className={`w-10 h-9 text-xs flex items-center justify-center shrink-0 
            ${selectedColor === color ? 'text-white border-white' : 'text-gray-800 border-transparent'}`}
          style={{
            backgroundColor: selectedColor === color ? color : 'transparent',
            borderColor: selectedColor === color ? color : 'transparent',  
          }}
          onClick={() => setSelectedColor(color)} 
        >
          {color}
        </button>
      ))}
            </div>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <div className="mt-6 flex flex-wrap gap-4">
              <button type="button" 
              onClick={handleWish}
              className="px-4 py-3 w-[45%] border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold  ">Add to wishlist</button>
              <button type="button"
              onClick={addtocarthandle}
              className="px-4 py-3 w-[45%] border border-black bg-black hover:bg-stone-300 hover:text-black  text-stone-300 text-sm font-semibold  ">Add to cart</button>
            </div>

            <hr className="my-6 border-gray-300" />
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 px-6 py-12">
        <div className="xl:max-w-screen-xl max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800">PRODUCT INFORMATION</h3>

              <div>
                <h3 className="text-gray-800 text-sm font-bold">Material:</h3>
                <p className="text-sm text-gray-500 mt-2">100% Organic Cotton</p>
              </div>

              <div>
                <h3 className="text-gray-800 text-sm font-bold">Care Guidelines:</h3>
                <p className="text-sm text-gray-500 mt-2">Wash cold, tumble dry low, do not bleach.</p>
              </div>

              <div>
                <h3 className="text-gray-800 text-sm font-bold">Features:</h3>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-gray-500">
                  <li>Eco-friendly, breathable fabric.</li>
                  <li>classNameic fit for everyday comfort.</li>
                  <li>Durable stitching for long-lasting wear.</li>
                  <li>Available in multiple colors and sizes.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800">SHIPPING & RETURNS</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 text-sm font-bold mb-2">Standard Shipping</p>
                    <p className="text-gray-500 text-sm">Delivery in 3-5 business days</p>
                  </div>
                  <span className="text-gray-500 text-sm">$5.00</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 text-sm font-bold mb-2">Expedited Shipping</p>
                    <p className="text-gray-500 text-sm">Delivery in 1-2 business days</p>
                  </div>
                  <span className="text-gray-500 text-sm">$15.00</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 text-sm font-bold mb-2">Pickup Option</p>
                    <p className="text-gray-500 text-sm">Available within 24 hours</p>
                  </div>
                  <span className="text-gray-500 text-sm">FREE</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">For more details on our return policy, <span className="underline">click here</span>.</p>
                <p className="text-sm text-gray-500">A $3.00 processing fee applies to returns. <span className="underline">Learn more</span>.</p>
                <p className="text-sm text-gray-500">Returns for online orders must be initiated online. In-store returns are not accepted.</p>
                <p className="text-sm text-gray-500">To promote sustainability, we now use electronic return labels. <span className="underline">Read more</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            
        </div>
    );
}
