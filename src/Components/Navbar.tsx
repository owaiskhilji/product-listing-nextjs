"use client"
import React, {useState } from "react";
import { useRouter } from "next/navigation" 
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiSearchFill } from "react-icons/ri";
 import '@/app/globals.css'
export default function Navbar() {
  const [searchValue,setserchValue ] = useState("")
  const router = useRouter()
 

  function handle(e:any){
    const target = e.target as HTMLInputElement
    setserchValue(target.value)
   
  } 
  function handleSearch(){
router.push(`/product/search/${searchValue}`)
  } 
  return (
<div className="main navbar bg-white shadow-md border-b-2 w-full px-8">
      <div className="flex-1 ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
        <li>
          <a>Shop</a>
          <ul className="p-2">
          <li><a href={"/"}>Home</a></li>
          </ul>
        </li>
        <li><a onClick={()=>router.push("#sale")}>On Sale</a></li>
      <li ><a onClick={()=>router.push("#arrival")}>New Arrivals</a></li>
      <li><a>Brands</a></li>
      </ul>
        </div>
        <a className="font-extrabold text-xl sm:text-2xl md:text-3xl text-black">SHOP.CO</a>
      </div>

      <div className="navbar-start hidden md:flex lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li>
        <details>
          <summary>Shop</summary>
          <ul className="p-2">
            <li><a href={"/"}>Home</a></li>
          </ul>
        </details>
      </li>
      <li><a onClick={()=>router.push("#sale")}>On Sale</a></li>
      <li><a onClick={()=>router.push("#arrival")}>New Arrivals</a></li>
      <li><a>Brands</a></li>
    </ul>
  </div>
      <div className="ser-div flex items-center gap-4 ">
        <div className=" hidden md:border-2 md:rounded-md md:flex items-center px-2 ">
          <input
            type="text"
            value={searchValue}
            onChange={handle}
            placeholder="Search"
            className="input md:w-full py-3 outline-none focus:outline-none"
          />
          <button 
          onClick={handleSearch}
          type="button">
            <RiSearchFill size={20} className="text-gray-500" />
          </button>
        </div>

        <ul className="flex items-center space-x-4 cursor-pointer ">
          <li className="block sm:hidden">
            <IoIosSearch size={25} />
          </li>
          <li onClick={()=>router.push("/wishcart")}>
            {/* <MdOutlineShoppingCart  /> */}
            <FaRegHeart size={25} />
          </li>
          <li>
            <CgProfile size={25} />
          </li>
        </ul>
      </div>
      </div>
  );
}