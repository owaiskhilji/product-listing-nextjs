"use client"
import React,{useState,useContext,useEffect} from "react"
import Link from "next/link";
import { GiToggles } from "react-icons/gi";
import ProductContext from "@/Context/ProductContext"


export default function Page() {
const [key , setkey] = useState("All")
const [price , setprice] = useState(300)
const [getAllData, setGetAllData] = useState<any[]>([]);
const [filter, setfilter] = useState<any[]>([]);
const [filterPop, setfilterPop] = useState<boolean>(false);
    


const value:any = useContext(ProductContext)
const fetchAllData = value?.getdata
 const dataCategory:string[] =["All","jeans","hoodie","shirt","tshirt","short"]


function applyFilter(){
const filtered = 
key === "All"?
getAllData.filter((item: any) => item.price <= price) :
  getAllData.filter((fil:any)=>fil.category === key && fil.price <= price)
  setfilter(filtered)       
  setfilterPop(true); // Set filter applied state   
}


    // Set data when the component mounts
    useEffect(() => {
      function handle (){
      if (Array.isArray(fetchAllData) && fetchAllData.length > 0) {
        setGetAllData(fetchAllData);
        setfilter(fetchAllData)
      }
      }
      handle()
    }, [fetchAllData]);



    useEffect(() => {
      if (filterPop && filter.length === 0) {
        alert("No products found for the selected filters.");
        setfilterPop(false); // Reset filter applied state
      }
    }, [filterPop, filter]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex flex-col justify-center py-20 md:flex md:flex-row md:justify-center">



{/* Toggle Button (Visible on Small Screens) */}
<div className="md:hidden flex justify-end pr-5">

<button
        className="md:hidden rounded-full border-2 w-14 text-black px-4 py-2 rlative top-16 left-80 z-30 flex justify-end"
        onClick={handleToggle}
        >
        {isOpen ?<GiToggles /> : <GiToggles />}
      </button>
        </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-10 md:static top-0 left-0 h-full w-64 md:w-96 bg-gray-100 shadow-lg transition-transform duration-300 md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-4">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Categories</h3>
              <ul className="space-y-2">
              {
               dataCategory && dataCategory.length > 0 ? (
                dataCategory.map((filter:any,i:number)=>{
                return(
                  <li key={i}
                  onClick={()=>setkey(filter)}
                  className={`${filter == key ? "text-black" : "text-gray-700"} cursor-pointer`}>{filter}</li>

                )
              }
              )
            ):(
              <p>cart is not found</p>
            )
          }
              </ul>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-sm font-medium mb-2">Price</h3>
              <input
              value={price}
              onChange={(e)=>setprice(Number(e.target.value))}
               type="range" min="78" max="300" className="w-full" />
             <p className="text-sm text-gray-500">Up to ${price}</p>
           
            </div>


{/* Colors */}
 <div>
  <h3 className="text-sm font-medium mb-2">Colors</h3>
  <div className="flex gap-4">
    <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
    <div className="w-6 h-6 bg-black rounded-full"></div>
    <div className="w-6 h-6 bg-white rounded-full"></div>
    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
  </div>
</div> 





          {/* Apply Filters Button */}
          <button 
           onClick={applyFilter}
          className="w-full py-2 bg-black text-white rounded-full">
              Apply Filters
            </button>
            
          </div>
           
        </div>
      </div>






        <div className="z-0">
        <div className="flex md:justify-between relative bottom-5 gap-x-3">
          <h1 className="font-extrabold text-xl md:text-4xl ml-5 md:ml relative bottom-2">
            {key}
          </h1>
          <p className="text-xs md:text-lg text-stone-400 w-24 sm:w-full md:w-full">Showing 1-10 of 100 Products</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {filter && filter.length > 0  ?  (
          filter.map((item :any, index:number) => (
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
        <p className="text-gray-500">No products available.</p>
      )
      }
      
        
      </div>
      </div>
      </div>




    </div>
  );
}





