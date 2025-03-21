// src/utils/shopify-product-utils.ts
import { productDataType } from './productData';

/**
 * Shopify product variant interface
 */
export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  available: boolean;
  sku: string;
  weight: number;
  weightUnit: string;
  image: {
    src: string;
    altText: string;
  } | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

/**
 * Shopify product interface
 */
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  } | null;
  variants: ShopifyVariant[];
  images: Array<{
    id: string;
    src: string;
    altText: string | null;
  }>;
  options: Array<{
    name: string;
    values: string[];
  }>;
  tags: string[];
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
  }> | null;
  availableForSale: boolean;
}

/**
 * Extracts metafield value from a Shopify product
 */
export const getMetafieldValue = (
  product: ShopifyProduct,
  namespace: string,
  key: string
): string | null => {
  if (!product.metafields) return null;

  const metafield = product.metafields.find(
    m => m.namespace === namespace && m.key === key
  );

  return metafield ? metafield.value : null;
};

/**
 * Extracts tags with specific prefix - useful for structured data in tags
 */
export const getTagsWithPrefix = (
  product: ShopifyProduct,
  tagPrefix: string
): string[] => {
  return product.tags
    .filter(tag => tag.startsWith(tagPrefix))
    .map(tag => tag.replace(tagPrefix, ''));
};

/**
 * Transforms Shopify product to app-specific format
 */
export const transformShopifyProduct = (shopifyProduct: ShopifyProduct): productDataType => {
  // Get primary variant
  const primaryVariant = shopifyProduct.variants[0];

  // Extract pricing
  const price = parseFloat(primaryVariant.price);
  const compareAtPrice = primaryVariant.compareAtPrice
    ? parseFloat(primaryVariant.compareAtPrice)
    : price;

  // Extract custom data from metafields
  let ingredients: string[] = [];
  const ingredientsMetafield = getMetafieldValue(shopifyProduct, 'product', 'ingredients');

  if (ingredientsMetafield) {
    try {
      ingredients = JSON.parse(ingredientsMetafield);
    } catch (e) {
      // Fallback to tag-based ingredients
      ingredients = getTagsWithPrefix(shopifyProduct, 'ingredient:');
    }
  } else {
    ingredients = getTagsWithPrefix(shopifyProduct, 'ingredient:');
  }

  // Extract nutritional info
  let nutritionalInfo = null;
  const nutritionMetafield = getMetafieldValue(shopifyProduct, 'product', 'nutritional_info');

  if (nutritionMetafield) {
    try {
      nutritionalInfo = JSON.parse(nutritionMetafield);
    } catch (e) {
      // Fallback to individual metafields
      nutritionalInfo = {
        calories: parseFloat(getMetafieldValue(shopifyProduct, 'product', 'calories') || '0'),
        fat: parseFloat(getMetafieldValue(shopifyProduct, 'product', 'fat') || '0'),
        carbs: parseFloat(getMetafieldValue(shopifyProduct, 'product', 'carbs') || '0'),
        protein: parseFloat(getMetafieldValue(shopifyProduct, 'product', 'protein') || '0')
      };
    }
  }

  // Format weight with unit
  const weightWithUnit = primaryVariant.weight
    ? `${primaryVariant.weight}${primaryVariant.weightUnit.toLowerCase()}`
    : getMetafieldValue(shopifyProduct, 'product', 'weight') || '20g';

  // Extract image URLs
  const imageUrls = shopifyProduct.images.map(img => img.src);

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    brand: shopifyProduct.vendor,
    categories: shopifyProduct.productType.toLowerCase(),
    price: price,
    stock: primaryVariant.available ? 999 : 0,
    weight: weightWithUnit,
    ingredients: ingredients,
    nutritionalInfo: nutritionalInfo,
    itemDescription: shopifyProduct.description,
    tastingNotes: getMetafieldValue(shopifyProduct, 'product', 'tasting_notes') || '',
    storageInstructions: getMetafieldValue(shopifyProduct, 'product', 'storage_instructions') || '',
    featured: shopifyProduct.tags.includes('featured'),
    images: imageUrls.length > 0 ? imageUrls : ['/images/custard-apple-1.jpg'] // Fallback image
  };
};

/**
 * Finds appropriate variant ID based on selected options
 */
export const getVariantId = (
  shopifyProduct: ShopifyProduct,
  selectedOptions: Record<string, string> = {}
): string => {
  // Single variant case
  if (Object.keys(selectedOptions).length === 0 || shopifyProduct.variants.length === 1) {
    return shopifyProduct.variants[0].id;
  }

  // Find variant matching all selected options
  const matchingVariant = shopifyProduct.variants.find(variant =>
    variant.selectedOptions.every(option =>
      selectedOptions[option.name] === option.value
    )
  );

  return matchingVariant ? matchingVariant.id : shopifyProduct.variants[0].id;
};