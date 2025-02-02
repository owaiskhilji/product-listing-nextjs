import Image from "next/image"
import imgb1 from "../../public/homeimage/Frameb1.png"
import imgb2 from "../../public/homeimage/Frameb2.png"
import imgb3 from "../../public/homeimage/Frameb3.png"
import imgb4 from "../../public/homeimage/Frameb4.png"

export default function Bottomcart(){
    return(
<div className="mt-20">
<div className="border-2 space-y-4 rounded-xl flex flex-col justify-center md:justify-center bg-Gray w-80 sm:w-[700px] md:w-[1300px] mx-auto md:h-[1000px] items-center px-10 py-5 md:py-0">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-extrabold ml-8">BROWSE BY DRESS STYLE</h1>
        <div className="block sm:flex md:flex md:flex-row space-y-5 sm:space-y-0 sm:space-x-4 md:space-x-5 md:space-y-0">
        <div className="card bg-base-100 w-64 sm:w-64 md:w-96 h-72 md:h-96 shadow-xl">
          <Image
                    src={imgb1}
                    alt="login-image"
                    className="w-full h-full"
                  />
         
          </div>
        <div className="card bg-base-100 w-64 sm:w-52 md:w-80 h-72 md:h-96 shadow-xl">
          
          <Image
                    src={imgb2}
                    alt="login-image"
                    className="w-full h-full"
                  />
          </div>
        
        
        </div>
        {/* qq */}
        
        
        <div className="block sm:flex md:flex space-y-5 sm:space-y-0 sm:space-x-4 md:space-x-5 md:space-y-0">
        <div className="card bg-base-100 w-64 sm:w-52 md:w-80 h-72 md:h-96 shadow-xl">
          <Image
                    src={imgb3}
                    alt="login-image"
                    className="w-full h-full"
                  />
         
          </div>
        <div className="card bg-base-100 w-64 sm:w-64 md:w-96 h-72 md:h-96 shadow-xl">
          
          <Image
                    src={imgb4}
                    alt="login-image"
                    className="w-full h-full"
                  />
          </div>
        
        
        </div>
        
        </div>
        </div>
        
    )
}