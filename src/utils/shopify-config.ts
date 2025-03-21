// src/utils/shopify-config.ts
import Client from 'shopify-buy';
import { productDataType } from './productData';

// Initialize the Shopify Client with store credentials
export const shopifyClient = Client.buildClient({
  domain: 'xwgk2d-kx.myshopify.com',
  storefrontAccessToken: '52d28409d020e76fb115c0c75802c9ed',
  apiVersion: '2023-07'  // Use a current API version
});

// Add debugging to help identify product fetching issues
export const debugFetchProducts = async () => {
  try {
    console.log('Attempting to fetch products from Shopify...');
    const products = await shopifyClient.product.fetchAll(250);
    console.log(`Successfully fetched ${products.length} products:`, products);
    return products;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    throw error;
  }
};

// Transforms Shopify product data to our app's product structure
export const transformShopifyProduct = (shopifyProduct: any): productDataType => {
  console.log('Transforming Shopify product:', shopifyProduct);

  // Extract metafields for custom data
  const getMetafield = (namespace: string, key: string) => {
    const metafield = shopifyProduct.metafields?.find(
      (m: any) => m.namespace === namespace && m.key === key
    );
    return metafield ? metafield.value : null;
  };

  // Get the first available variant or the first variant if none are available
  const primaryVariant = shopifyProduct.variants[0];

  // Convert price from string to number
  const price = parseFloat(primaryVariant.price);

  // Extract ingredients from tags or metafields
  const ingredients = getMetafield('product', 'ingredients')
    ? JSON.parse(getMetafield('product', 'ingredients'))
    : shopifyProduct.tags.filter((tag: string) => tag.startsWith('ingredient:'))
      .map((tag: string) => tag.replace('ingredient:', ''));

  // Extract nutritional info
  let nutritionalInfo = null;
  const nutritionData = getMetafield('product', 'nutritional_info');
  if (nutritionData) {
    try {
      nutritionalInfo = JSON.parse(nutritionData);
    } catch (e) {
      console.error('Error parsing nutritional info:', e);
    }
  }

  // Add defaultVariantId for cart functionality
  const defaultVariantId = primaryVariant.id;

  // If images array is empty, provide a default image
  const images = shopifyProduct.images.length > 0
    ? shopifyProduct.images.map((img: any) => img.src)
    : ['/images/custard-apple-1.jpg'];

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    brand: shopifyProduct.vendor,
    categories: shopifyProduct.productType.toLowerCase(),
    price: price,
    stock: primaryVariant.available ? 999 : 0,
    weight: `${primaryVariant.weight}${primaryVariant.weightUnit}`,
    ingredients: ingredients.length > 0 ? ingredients : ['100% Natural Fruit'],
    nutritionalInfo: nutritionalInfo || {
      calories: parseFloat(getMetafield('product', 'calories') || '60'),
      fat: parseFloat(getMetafield('product', 'fat') || '0.5'),
      carbs: parseFloat(getMetafield('product', 'carbs') || '15'),
      protein: parseFloat(getMetafield('product', 'protein') || '1.5')
    },
    itemDescription: shopifyProduct.description || 'Premium freeze-dried fruit with all natural goodness.',
    tastingNotes: getMetafield('product', 'tasting_notes') || 'Sweet and crispy with intense natural flavor.',
    storageInstructions: getMetafield('product', 'storage_instructions') || 'Store in a cool, dry place. Reseal after opening.',
    featured: shopifyProduct.tags.includes('featured'),
    images: images,
    // Add defaultVariantId as a non-enumerable property
    defaultVariantId
  } as productDataType & { defaultVariantId: string };
};