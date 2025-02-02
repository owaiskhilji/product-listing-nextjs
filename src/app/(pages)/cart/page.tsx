"use client"
import React , {useEffect,useState} from "react"
import {useRouter} from "next/navigation"

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    sizes: string[],
    imageUrl: string,
    selectedsize? : string
  }


export default function page(){
      const [addtocartData,setaddtocartData]=useState<CartItem[]>([])
    const [total , setTotal ] = useState(0)
    const [loading , setloading ] = useState(true)
const router = useRouter()

    useEffect(()=>{
function getLocalStorageData(){
      const getData = localStorage.getItem("addtocart")
       if(getData){
            const parseData = JSON.parse(getData)
            const addItemData = parseData.map((item:any)=>(
                {
                    ...item ,
                    quantity:1
                }
            ))
            setaddtocartData(addItemData)
            setloading(false)
 
        }
        if(!getData){
            console.log("Data not found in localStorage.")
        }}
        getLocalStorageData()
    },[])


    function handleQunantityChange(index :number ,operator: "increment"| "decrement"){
        setaddtocartData((preData:any[])=>{
        const updateData = preData.map((item,i:number)=>{
          if(i === index){
            const newQuantity = operator === "increment"? item.quantity + 1 : item.quantity - 1
            return {...item, quantity:newQuantity}
          }
          return item
        }) 

        localStorage.setItem("addtocart", JSON.stringify(updateData));

        return updateData
        
        })}
    
    
        function handleSizeChange(index :number ,size:string){
        setaddtocartData((preData:any[])=>{
        const updateData = preData.map((item,i:number)=>{
          if(i === index){
            return {...item, selectedsize:size}
          }
          return item
        }) 
        localStorage.setItem("addtocart", JSON.stringify(updateData));

        return updateData
        
        })}

useEffect(()=>{
    calculateTotal(addtocartData)

},[addtocartData])



        function calculateTotal(item:any){
            const totalAmount = item.reduce((total:number,item:any)=>total + item.quantity * item.price,0)
        setTotal(totalAmount)
        }
        
        

const checkOutButton = async(addtocartData:CartItem[],total:number)=>{
    try{
        const response =await fetch("/api/create-order",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                totalprice: total,
                orderdate: new Date().toISOString(),
                products: addtocartData.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    selectedsize: item.selectedsize,
                    image: item.imageUrl,
                }))
            })
            
        })
        const data = await response.json()
        if(response.ok){
            console.log("data sucessfully store",data)
        }else{
        throw new Error("Order submission failed")
        }
        return data

    }catch(err){
        console.log("server error",err)
    }



} 











    if (loading) return <div className="mt-44 flex justify-center "><span className="loading loading-ring loading-lg"></span></div>;
    if (!addtocartData || addtocartData.length === 0) return <div>Cart is empty!</div>;


    return(
        <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
        <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                <hr className="border-gray-300 mt-4 mb-8" />

                <div className="space-y-4">
                    {
                        addtocartData && addtocartData.length > 0 ? (
                        addtocartData.map((item:any,i:number)=>( 
                    <div 
                    key={i}
                    className="grid grid-cols-3 items-center gap-4">
                        <div className="col-span-2 flex items-center gap-4">
                            <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                <img src={item.imageUrl} className="w-full h-full object-contain" />
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-800">{item.name}</h3>
                                <h6 className="text-xs text-red-500 cursor-pointer mt-0.5">Remove</h6>

                                <div className="flex gap-4 mt-4">
                                <div className="relative group">
                                        <button type="button"
                                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                            {item.selectedsize}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-gray-500 inline ml-2.5" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd"
                                                    d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                                    clip-rule="evenodd" data-original="#000000" />
                                            </svg>
                                        </button>
                             {
                                     item.sizes && (

                                        <ul className='group-hover:block hidden absolute rounded-md min-w-[80px] shadow-lg bg-white z-[1000]'>
                                      {
                                        item.sizes.map((size:string,e:number)=>(
                                            <li
                                            key={e}
                                            onClick={()=>handleSizeChange(i,size)}
                                            className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>{size}</li>
                                        ))
                                      }
                                        </ul>
        
                                          )
                                                  }                             
                                           </div> 
 
                                    <div>
                                        <button type="button"

                                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                           onClick={()=>handleQunantityChange(i,"decrement") } 
                                         className="w-2.5 fill-current" viewBox="0 0 124 124">
                                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                            </svg>

                                            <span className="mx-2.5">{item.quantity}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                            onClick={()=>handleQunantityChange(i,"increment")} 
                                             className="w-2.5 fill-current" viewBox="0 0 42 42">
                                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                            </svg>
                                        </button>
                                    </div>

 


                                </div>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <h4 className="text-base font-bold text-gray-800">${item.quantity*item.price}</h4>
                        </div>
                    </div>

))
):(
    <p></p>
)  
}
</div>
                    
            </div>

            <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
            

                <ul className="text-gray-800 mt-8 space-y-4">
                    <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">${total}</span></li>
                </ul>

                <div className="mt-8 space-y-2">
                    <button
                    onClick={()=>checkOutButton(addtocartData,total)}
                     type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-black hover:bg-stone-300 hover:text-black text-stone-300 rounded-md">Checkout</button>
                    <button 
                    onClick={()=>router.push("/product")}
                    type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-stone-300 hover:bg-black hover:text-stone-300 text-black border border-gray-300 rounded-md">Continue Shopping  </button>
                </div>
            </div>
        </div>
    </div>
    )
}