import sanityClient from "../app/(use_sanity)/sanity/sanity.client"

export const uploadImage = async (imageUrl:any) => {
    try {
        console.log(`Uploading image: ${imageUrl}`);
    
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${imageUrl}`);
        }
    
        const buffer = await response.arrayBuffer();
        const bufferImage = Buffer.from(buffer);
    
        const asset = await sanityClient.assets.upload('image', bufferImage, {
          filename: imageUrl.split('/').pop(),
        });
    
        console.log(`Image uploaded successfully: ${asset._id}`);
        return asset._id;
      } catch (error) {
        console.error('Failed to upload image:', imageUrl, error);
        return null;
      }
};

export const createOrder = async (imageId: string) => {
  try {
    const order = {
      _type: "order",
      image: {
        _type: "image",
        asset: {
          _ref: imageId, 
        },
      },
    };

    const newOrder = await sanityClient.create(order);
    console.log("Order Created:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Order creation error:", error);
    throw error;
  }
};
