export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription: string;
  benefits: string[];
  // Updated structure for multiple images
  images: {
    main: string;     // Main product image (thumbnail/card view)
    gallery: string[] // Additional product images for gallery view
  };
  ingredientsTags: string[];
  weight: string;
  inStock: boolean;
}

// Updated product data with multiple images
export const products: Product[] = [
  {
    id: "tropi-mix",
    name: "Tropi Mix",
    slug: "tropi-mix",
    price: 12.99,
    description: "Our signature Tropi Mix combines the exotic flavors of pineapple, mango, and banana in one delicious freeze-dried blend. Each bite delivers a burst of tropical flavor that will transport you to paradise. Made with 100% natural fruits and no additives.",
    shortDescription: "Exotic blend of freeze-dried pineapple, mango, and banana",
    benefits: [
      "No added sugar",
      "100% natural fruits",
      "Rich in vitamins A & C",
      "Perfect healthy snack"
    ],
    images: {
      main: "/images/products/custard-apple-detail1.jpg",
      gallery: [
        "/images/products/custard-apple-detail2.jpg"
      ]
    },
    ingredientsTags: ["Pineapple", "Mango", "Banana"],
    weight: "60g",
    inStock: true
  },
  {
    id: "berry-burst",
    name: "Berry Burst",
    slug: "berry-burst",
    price: 14.99,
    description: "Experience the intense flavor of freeze-dried berries with our Berry Burst mix. Featuring strawberries, blueberries, and raspberries, this antioxidant-rich snack delivers the perfect balance of sweet and tart in every crunchy bite. All natural, no preservatives.",
    shortDescription: "Antioxidant-rich mix of freeze-dried strawberries, blueberries, and raspberries",
    benefits: [
      "High in antioxidants",
      "No preservatives",
      "Rich in fiber",
      "Great for smoothie bowls"
    ],
    images: {
      main: "/images/products/jamun-detail1.jpg",
      gallery: [
        "/images/products/jamun-detail2.jpg"
      ]
    },
    ingredientsTags: ["Strawberry", "Blueberry", "Raspberry"],
    weight: "50g",
    inStock: true
  },
  {
    id: "citrus-delight",
    name: "Citrus Delight",
    slug: "citrus-delight",
    price: 13.99,
    description: "Our Citrus Delight brings together the vibrant flavors of orange, lemon, and lime in a tangy, refreshing freeze-dried snack. Each piece retains the natural zest and vitamin C of fresh citrus fruits, making it both delicious and nutritious.",
    shortDescription: "Tangy blend of freeze-dried orange, lemon, and lime",
    benefits: [
      "High in vitamin C",
      "Natural immune support",
      "Refreshing citrus flavor",
      "Perfect for baking and garnishes"
    ],
    images: {
      main: "/images/products/jackfruit-detail1.jpg",
      gallery: [
        "/images/products/jackfruit-detail2.jpg"
      ]
    },
    ingredientsTags: ["Orange", "Lemon", "Lime"],
    weight: "55g",
    inStock: true
  }
];

// Helper function to get a product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

// Helper function to get all product slugs (useful for static paths in Next.js)
export function getAllProductSlugs(): string[] {
  return products.map(product => product.slug);
}