"use client"
import {sanityConfig} from "@/app/(use_sanity)/sanity/sanity.config"
import {NextStudio} from "next-sanity/studio"
export default function page(){
    return <NextStudio config={sanityConfig}/>
}