"use client"
import React, { useState, useEffect } from "react";

export default function page({params}:{params:{id:string}}){
const {id} = params
  const [data, setData] = useState<any>("");
  useEffect(() => {
    async function getData(){
      try {
    const res =await  fetch(`https://dummyjson.com/products/${id}`)
  const convertData = await res.json()
  setData(convertData)  
  } catch (error) {
    console.log("get data error",error)
  }  
  }
    getData()
}, []);  
console.log("DATA >>>" ,data)
  if (!data) <p>loading.../</p>
return(
        <>
<div className="font-[sans-serif] p-4 bg-gray-100">
  <div className="lg:max-w-6xl max-w-xl mx-auto">
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
      <div className="w-full lg:sticky top-0">
        <div className="flex flex-col gap-4">
          <div className="bg-white shadow p-2">
            <img 
            src={data.thumbnail}
             alt={data.title}
              className="w-full  aspect-[11/8] object-cover object-top" />
          </div>
          {data.images && data.images.length > 0 && (
          <div className="bg-white p-2 w-full max-w-full overflow-auto">
            <div className="flex justify-between flex-row gap-4 shrink-0">
{
  data.images.slice(0,3).map((img:string,i:number)=>(
    <img 
    key={i}
    src={img}
    alt={`product ${i+1}`}
      className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-black" />
  ))
}
            </div>
          </div>
)}
        </div>
      </div>

      <div className="w-full">
        <div>
          <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">{data.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
            <p className="text-sm text-gray-500">{data.rating}</p>
                    {
                    data.rating && [...Array(Math.floor(data.rating))].map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-4 h-4 fill-stone-600"
                        viewBox="0 0 14 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    ))}
            </div>
            <span className="text-gray-500">|</span>
            <p className="text-sm text-gray-500">{data.stock} In stock</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500 mt-1 text-sm">{data.description}</p>
          </div>

          <div className="flex items-center flex-wrap gap-2 mt-4">
            <h4 className="text-stone-500 text-2xl sm:text-3xl font-bold">{Math.floor(data.price)}Rs</h4>
            <div className="flex py-1 px-2 text-stone-500 font-semibold !ml-4">
              <span className="text-white p-1 bg-stone-600 text-xs rounded-sm ">save {Math.floor(data.discountPercentage)}%</span>
            </div>
          </div>

          <div>
            <h4 className="text-base mt-4 text-gray-500 font-semibold">Net Wt: {data.weight} G</h4>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div>
          <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2.5 w-max">
            <button type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
                <path
                  d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z"
                  data-original="#000000" />
              </svg>
            </button>
            <span className="text-gray-800 text-sm font-semibold px-3">1</span>
            <button type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 512 512">
                <path
                  d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z"
                  data-original="#000000" />
                <path
                  d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z"
                  data-original="#000000" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <button type="button"
              className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">Add
              to cart</button>
            <button type="button"
              className="px-4 py-3 w-[45%] border border-stone-600 bg-stone-600 hover:bg-stone-700 text-white text-sm font-semibold">Buy
              it now</button>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Select Delivery Location</h3>
          <p className="text-gray-500 text-sm mt-1">Enter the pincode of your area to check product availability.</p>
          <div className='flex items-center gap-2 mt-4 max-w-sm'>
            <input type='number' placeholder='Enter pincode'
              className='bg-white px-4 py-2.5 text-sm w-full  border border-gray-300 outline-0' />
            <button type='button'
              className='border border-stone-600 outline-none bg-stone-600 hover:bg-stone-700 text-white  px-4 py-2.5 text-sm'>Apply</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
        </>
    )
}

