import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qiuiog3l",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATADEST || "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-20'
});

// Function to upload an image to Sanity

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error.message);
    return null;
  }
}


// Function to upload a product to Sanity
async function uploadProduct(product) {
  try {
    console.log(`Uploading product: ${product.name}`);
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: 'products',
        name: product.name,
        description: product.description,
        price: product.price,
        image: {
          _type: 'image',
          asset: {
            _ref: imageId,
          },
        },
        sizes: product.sizes || [],
        colors: product.colors || [],
        category: product.category,
        discountPercent: product.discountPercent,
        isNew: product.isNew,
      };

      const createdProduct = await client.create(document);
      console.log(`Product ${product.name} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product ${product.name} skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', product.name, error.message);
  }
}

// Function to add a delay between batches
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fetch and import products in batches
async function importProducts() {
  try {
    console.log('Fetching products from API...');
    const response = await fetch('https://template1-neon-nu.vercel.app/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log(`Fetched ${products.length} products.`);

    // Process products in batches of 5
    for (let i = 0; i < products.length; i += 5) {
      const batch = products.slice(i, i + 5);
      console.log(`Processing batch ${i / 5 + 1}...`);

      // Upload batch
      await Promise.all(batch.map((product) => uploadProduct(product)));

      console.log(`Batch ${i / 5 + 1} uploaded successfully.`);
      await delay(1000); // Add a delay of 1 second between batches
    }

    console.log('All products imported successfully!');
  } catch (error) {
    console.error('Error importing products:', error.message);
  }
}

// Run the import process
importProducts();

