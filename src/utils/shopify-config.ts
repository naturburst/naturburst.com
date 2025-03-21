// src/utils/shopify-config.ts
import Client from 'shopify-buy';
import { productDataType } from './productData';

// Initialize the Shopify Client with store credentials
export const shopifyClient = Client.buildClient({
  domain: 'xwgk2d-kx.myshopify.com',
  storefrontAccessToken: '52d28409d020e76fb115c0c75802c9ed',
  apiVersion: '2025-01'
});

// Interface for Shopify-specific product structure
export interface ShopifyProductType {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
  variants: Array<{
    id: string;
    title: string;
    price: string;
    compareAtPrice: string | null;
    available: boolean;
    sku: string;
    weight: number;
    weightUnit: string;
  }>;
  description: string;
  descriptionHtml: string;
  images: Array<{
    id: string;
    src: string;
    altText: string;
  }>;
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
  }>;
  tags: string[];
  availableForSale: boolean;
}

// Transforms Shopify product data to our app's product structure
export const transformShopifyProduct = (shopifyProduct: any): productDataType => {
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
  // Store compareAtPrice for potential future use but don't add to return object
  const compareAtPrice = primaryVariant.compareAtPrice
    ? parseFloat(primaryVariant.compareAtPrice)
    : null;

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

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    brand: shopifyProduct.vendor,
    categories: shopifyProduct.productType.toLowerCase(),
    price: price, // Use the compareAtPrice as the "regular" price if available
    stock: primaryVariant.available ? 999 : 0,
    weight: `${primaryVariant.weight}${primaryVariant.weightUnit}`,
    ingredients: ingredients,
    nutritionalInfo: nutritionalInfo || {
      calories: parseFloat(getMetafield('product', 'calories') || '0'),
      fat: parseFloat(getMetafield('product', 'fat') || '0'),
      carbs: parseFloat(getMetafield('product', 'carbs') || '0'),
      protein: parseFloat(getMetafield('product', 'protein') || '0')
    },
    itemDescription: shopifyProduct.description,
    tastingNotes: getMetafield('product', 'tasting_notes') || '',
    storageInstructions: getMetafield('product', 'storage_instructions') || '',
    featured: shopifyProduct.tags.includes('featured'),
    images: shopifyProduct.images.map((img: any) => img.src),
    // Add defaultVariantId as a non-enumerable property
    defaultVariantId
  } as productDataType & { defaultVariantId: string };
};