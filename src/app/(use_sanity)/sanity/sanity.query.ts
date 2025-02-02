// import { groq } from "next-sanity";
// import sanityClient from "./sanity.client";

// async function getData(){
//     return sanityClient.fetch(
//         groq`
//         *[_type=="products"]{
//             _id,
//             name,
//             description,
//             price,
//             "imageUrl" : image.asset->url,
//             category,
//             discountPercent,
//             "isNew": new,
//             colors,
//             sizes
//           }
//         `
//     )
// }