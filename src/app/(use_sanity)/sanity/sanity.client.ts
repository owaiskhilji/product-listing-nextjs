import { createClient ,type ClientConfig } from "next-sanity";

const sanityClient: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qiuiog3l",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATADEST || "production",  
    token:   process.env.SANITY_API_TOKEN,
    apiVersion :"2025-01-20",
    useCdn: false,
}

export default createClient(sanityClient)