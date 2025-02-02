"use client"
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import ProductContext from "@/Context/ProductContext"
import React,{useEffect, useState} from "react";

export default function layout({children}:any){
    
    const [getdata , setgetData] = useState<any[]>([])
    const [getdataLoaded , setgetdataLoaded] = useState<boolean>(false)
 
    useEffect(()=>{
    const storedData: any = localStorage.getItem("productData")
    if (storedData) {
    setgetData(JSON.parse(storedData))
    }
    setgetdataLoaded(true)
},[])
useEffect(()=>{
    if (getdataLoaded && getdata.length > 0) {
        localStorage.setItem("productData",JSON.stringify(getdata))
    }
},[getdata,getdataLoaded])

    return(
    
<ProductContext.Provider value={{getdata , setgetData}}>
        <Navbar/>
        {children}
        <Footer/>
</ProductContext.Provider>
    )
}